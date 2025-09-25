import {useEffect, useState} from "react";
import {Card, Button, Checkbox, Slider, message, Rate} from "antd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Remove from "@mui/icons-material/Remove";
import {useDispatch, useSelector} from "react-redux";
import {getTripPassengersByTripsAction} from "../../redux/actions/tripAction";
import _ from "lodash";
import {CANCEL_SORT_TIME} from "../../redux/types/BookingTypes";

export default function FilterTrips(props) {
	const dispatch = useDispatch();
	let {listTripPassenger, originalListTripPassenger} = useSelector((state) => state.BookingReducer);

	let arrFilterPassenger = _.uniqBy(originalListTripPassenger, "passengerId");

	useEffect(() => {
		if (props.tripIds && props.tripIds.length > 0) {
			dispatch(getTripPassengersByTripsAction(props.tripIds));
		}
	}, [props.tripIds, dispatch]);

	// State để lưu tất cả bộ lọc
	const [filters, setFilters] = useState({
		timeRange: null, // { start: "06:00:00", end: "12:00:00" }
		priceRange: [0, 5000000], // Giá vé
		minEmptySeats: 1, // Số ghế trống tối thiểu
		passengerIds: [], // Danh sách nhà xe được chọn
		seatType: null, // "seat" hoặc "bed"
		rating: null, // Số sao
	});

	const [btnActive, setBtnActive] = useState({
		activeObject: null,
		objects: [
			{
				id: 1,
				filterTime: "00:00 - 06:00",
				time: "Sáng sớm",
				timeStart: "00:00:00",
				timeEnd: "06:00:00",
			},
			{
				id: 2,
				filterTime: "06:01 - 12:00",
				time: "Buổi sáng",
				timeStart: "06:01:00",
				timeEnd: "12:00:00",
			},
			{
				id: 3,
				filterTime: "12:01 - 18:00",
				time: "Buổi chiều",
				timeStart: "12:01:00",
				timeEnd: "18:00:00",
			},
			{
				id: 4,
				filterTime: "18:01 - 23:59",
				time: "Buổi tối",
				timeStart: "18:01:00",
				timeEnd: "23:59:00",
			},
		],
	});

	const [minmax, setMinMax] = useState([0, 5000000]);
	const [gheTrong, setGheTrong] = useState(1);
	const [selectedPassengers, setSelectedPassengers] = useState([]);

	// Lọc dữ liệu mỗi khi filters hoặc dữ liệu gốc thay đổi
	useEffect(() => {
		const {timeRange, priceRange, minEmptySeats, passengerIds, seatType, rating} = filters;

		let filtered = originalListTripPassenger;

		// 1. Lọc theo khoảng thời gian
		if (timeRange) {
			filtered = filtered.filter((trip) => {
				if (!trip.startTime) return false;
				return trip.startTime >= timeRange.start && trip.startTime <= timeRange.end;
			});
		}

		// 2. Lọc theo giá vé
		if (priceRange) {
			const [minPrice, maxPrice] = priceRange;
			filtered = filtered.filter((trip) => trip.passenger?.price >= minPrice && trip.passenger?.price <= maxPrice);
		}

		// 3. Lọc theo số ghế trống
		if (minEmptySeats > 1) {
			filtered = filtered.filter((trip) => {
				const emptySeats = trip.vehicle?.seatVehicle.filter((seat) => seat.status === "chưa đặt").length || 0;
				return emptySeats >= minEmptySeats;
			});
		}

		// 4. Lọc theo nhà xe
		if (passengerIds.length > 0) {
			filtered = filtered.filter((trip) => passengerIds.includes(trip.passengerId));
		}

		// 5. Lọc theo loại ghế
		if (seatType) {
			filtered = filtered.filter((trip) => trip.vehicle?.type === seatType);
		}

		// 6. Lọc theo đánh giá trung bình
		if (rating) {
			filtered = filtered.filter((trip) => {
				const passengerRates = trip.passenger?.passengerRate || [];
				const avgRating = getAverageRating(passengerRates);
				return avgRating >= rating;
			});
		}

		// Cập nhật redux store
		dispatch({
			type: "GET_TRIP_PASSENGER",
			listTripPassenger: filtered,
		});
	}, [filters, originalListTripPassenger, dispatch]);

	// Xử lý khi chọn nhà xe (checkbox)
	const onChangePassenger = (passengerId, checked) => {
		let newSelected;
		if (checked) {
			newSelected = [...selectedPassengers, passengerId];
		} else {
			newSelected = selectedPassengers.filter((id) => id !== passengerId);
		}
		setSelectedPassengers(newSelected);
		setFilters((prev) => ({
			...prev,
			passengerIds: newSelected,
		}));
	};

	const getAverageRating = (passengerRate) => {
		if (!Array.isArray(passengerRate) || passengerRate.length === 0) return 0;

		const total = passengerRate.reduce((sum, rate) => sum + rate.numberRate, 0);
		return total / passengerRate.length;
	};

	// Xử lý toggle nút lọc thời gian
	const toggleActive = (index) => {
		if (btnActive.objects[index] === btnActive.activeObject) {
			setBtnActive({...btnActive, activeObject: null});
			setFilters((prev) => ({
				...prev,
				timeRange: null,
			}));
			dispatch({type: CANCEL_SORT_TIME});
		} else {
			setBtnActive({...btnActive, activeObject: btnActive.objects[index]});
			setFilters((prev) => ({
				...prev,
				timeRange: {
					start: btnActive.objects[index].timeStart,
					end: btnActive.objects[index].timeEnd,
				},
			}));
		}
	};

	const toggleActiveStyle = (index) => {
		if (btnActive.objects[index] === btnActive.activeObject) {
			return "active-filterTime";
		} else {
			return "";
		}
	};

	return (
		<div className="filter_trip">
			<div style={{display: "block"}}>
				<span className="grLeft-label-left font-bold text-xl">Bộ lọc tìm kiếm</span>
			</div>
			<Card style={{width: 300}}>
				<div className="list_time">
					<div className="filter-times-container groupStyle">
						<p className="filter-name labelStyle font-bold">Giờ đi</p>
						<div className="time_filter">
							{btnActive.objects.map((element, index) => (
								<Button key={index} className={toggleActiveStyle(index)} onClick={() => toggleActive(index)}>
									<p className="option-label">{element.time}</p>
									<p className="option-value">{element.filterTime}</p>
								</Button>
							))}
						</div>
					</div>
				</div>

				<div className="filter_price">
					<p className="filter-name labelStyle font-bold">Giá vé</p>
					<Slider
						range={{draggableTrack: true}}
						step={50000}
						min={0}
						max={5000000}
						value={filters.priceRange}
						onChange={(value) => {
							setFilters((prev) => ({...prev, priceRange: value}));
							setMinMax(value);
						}}
					/>
					<div className="flex justify-between">
						<div className="value-left value-info">{filters.priceRange[0].toLocaleString()} đ</div>
						<div className="value-right value-info">{filters.priceRange[1].toLocaleString()} đ</div>
					</div>
				</div>

				<div className="filter_seat">
					<p className="filter-name labelStyle font-bold">Chọn vị trí ghế</p>
					<div className="flex justify-between">
						<p className="color--darkness">Số ghế trống</p>
						<div className="QuantityInput__Container flex items-center justify-center">
							<button
								disabled={filters.minEmptySeats <= 1}
								type="button"
								className="ant-btn QuantityInput__RoundButton"
								onClick={() => {
									if (filters.minEmptySeats <= 1) return;
									const newValue = filters.minEmptySeats - 1;
									setFilters((prev) => ({...prev, minEmptySeats: newValue}));
									setGheTrong(newValue);
								}}
							>
								<Remove />
							</button>
							<div className="quantity-value mx-5 text-sm font-bold">
								<p className="color--darkness mb-0">{filters.minEmptySeats}</p>
							</div>
							<button
								type="button"
								className="ant-btn QuantityInput__RoundButton"
								onClick={() => {
									const newValue = filters.minEmptySeats + 1;
									setFilters((prev) => ({...prev, minEmptySeats: newValue}));
									setGheTrong(newValue);
								}}
							>
								<AddCircleIcon />
							</button>
						</div>
					</div>

					{/* Nhà xe */}
					<div className="filter_passenger mt-5">
						<p className="filter-name labelStyle font-bold">Nhà xe</p>
						<div className="mt-3 overflow-y-auto filer-passenger flex flex-col" style={{maxHeight: "100px"}}>
							{arrFilterPassenger.map((item) => (
								<Checkbox key={item.passengerId} checked={selectedPassengers.includes(item.passengerId)} onChange={(e) => onChangePassenger(item.passengerId, e.target.checked)}>
									{item.passenger?.name}
								</Checkbox>
							))}
						</div>
					</div>
				</div>

				<div className="filter_typeseat mt-5">
					<p className="filter-name labelStyle font-bold">Loại ghế / giường</p>
					<div className="mt-3 filer-passenger">
						<Checkbox
							checked={filters.seatType === "normal"}
							onChange={(e) => {
								setFilters((prev) => ({
									...prev,
									seatType: e.target.checked ? "normal" : null,
								}));
							}}
						>
							Ghế ngồi
						</Checkbox>
						<Checkbox
							checked={filters.seatType === "limouse"}
							onChange={(e) => {
								setFilters((prev) => ({
									...prev,
									seatType: e.target.checked ? "limouse" : null,
								}));
							}}
						>
							Giường nằm
						</Checkbox>
					</div>
				</div>

				<div className="filter_rating mt-5">
					<p className="filter-name labelStyle font-bold">Đánh giá nhà xe</p>
					<div className="mt-3 flex items-center gap-2">
						<Rate
							allowClear
							value={filters.rating}
							onChange={(value) => {
								setFilters((prev) => ({
									...prev,
									rating: value,
								}));
							}}
						/>
						{filters.rating ? <span className="ml-2">Trở lên</span> : null}
					</div>
				</div>

				<div className="mt-4 text-center">
					<Button
						type="default"
						danger
						onClick={() => {
							setFilters({
								timeRange: null,
								priceRange: [0, 5000000],
								minEmptySeats: 1,
								passengerIds: [],
								seatType: null,
								rating: null,
							});
							setMinMax([0, 5000000]);
							setGheTrong(1);
							setSelectedPassengers([]);
							setBtnActive({...btnActive, activeObject: null});
							dispatch({
								type: "GET_TRIP_PASSENGER",
								listTripPassenger: originalListTripPassenger,
							});
							dispatch({
								type: CANCEL_SORT_TIME,
							});
							message.success("Đã xoá bộ lọc");
						}}
					>
						Xoá bộ lọc
					</Button>
				</div>
			</Card>
		</div>
	);
}
