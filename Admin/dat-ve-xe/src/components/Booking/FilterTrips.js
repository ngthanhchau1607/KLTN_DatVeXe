import React, {useEffect, useState} from "react";
import {Card, Button, Checkbox, Slider, Input, Rate, message} from "antd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import Remove from "@mui/icons-material/Remove";
import {useDispatch, useSelector} from "react-redux";
import {FILTER_TRIPPASSENGER_TIME} from "../../redux/types/TripTypes";
import {FilterTimeTripPassengerAction, FilterPriceTripPassengerAction, FilterTypeTripPassengerAction, getTripPassengerAction, FilterBlankTripPassengerAction, FilterPassengerTripPassengerAction, getTripPassenger2Action, FilterSeatTripPassengerAction, FilterRateTripPassengerAction, getTripPassengersByTripsAction} from "../../redux/actions/tripAction";
import _ from "lodash";
import {CANCEL_SORT_TIME, SET_SORT_TIME} from "../../redux/types/BookingTypes";
const {Search} = Input;

export default function FilterTrips(props) {
	const dispatch = useDispatch();
	let {listTripPassenger, listTripPassenger2, originalListTripPassenger} = useSelector((state) => state.BookingReducer);

	let arrFilterPassenger = _.uniqBy(listTripPassenger2, "passengerId");
	useEffect(() => {
		if (props.tripIds && props.tripIds.length > 0) {
			dispatch(getTripPassengersByTripsAction(props.tripIds));
		}
	}, [props.tripIds]);

	const [minmax, setMinMax] = useState([0, 5000000]);
	const [gheTrong, setGheTrong] = useState(1);
	const [btnActive, setBtnActive] = useState({
		activeObject: null,
		objects: [
			{id: 1, filterTime: "00:00 - 06:00", time: "Sáng sớm", timeStart: "00:00:00", timeEnd: "06:00:00"},
			{id: 2, filterTime: "06:01 - 12:00", time: "Buổi sáng", timeStart: "06:01:00", timeEnd: "12:00:00"},
			{id: 3, filterTime: "12:01 - 18:00", time: "Buổi chiều", timeStart: "12:01:00", timeEnd: "18:00:00"},
			{id: 4, filterTime: "18:01 - 23:59", time: "Buổi tối", timeStart: "18:01:00", timeEnd: "23:59:00"},
		],
	});

	const [selectedPassengers, setSelectedPassengers] = useState([]);

	const renderPassenger = () => {
		return arrFilterPassenger.map((item) => (
			<Checkbox
				key={item.passengerId}
				checked={selectedPassengers.includes(item.passengerId)}
				onChange={(e) => {
					let newSelected;
					if (e.target.checked) {
						newSelected = [...selectedPassengers, item.passengerId];
					} else {
						newSelected = selectedPassengers.filter((id) => id !== item.passengerId);
					}

					setSelectedPassengers(newSelected);

					// Lọc dữ liệu ở đây
					if (newSelected.length > 0) {
						const filtered = originalListTripPassenger.filter((trip) => newSelected.includes(trip.passengerId));

						dispatch({
							type: "GET_TRIP_PASSENGER",
							listTripPassenger: filtered,
						});
					} else {
						// Nếu không chọn gì → reset
						dispatch({
							type: "GET_TRIP_PASSENGER",
							listTripPassenger: originalListTripPassenger,
						});
					}
				}}
			>
				{item.passenger?.name}
			</Checkbox>
		));
	};

	function toggleActive(index) {
		if (btnActive.objects[index] === btnActive.activeObject) {
			setBtnActive({...btnActive, activeObject: null});
			dispatch({
				type: CANCEL_SORT_TIME,
			});
		} else {
			setBtnActive({...btnActive, activeObject: btnActive.objects[index]});
			dispatch({
				type: SET_SORT_TIME,
			});
		}
	}
	function toggleActiveStyle(index) {
		if (btnActive.objects[index] === btnActive.activeObject) {
			return "active-filterTime";
		} else {
			return "";
		}
	}

	return (
		<div className="filter_trip">
			<div style={{display: "block"}}>
				<span className="grLeft-label-left font-bold text-xl">Bộ lọc tìm kiếm</span>
			</div>
			<Card style={{width: 300}}>
				<div classname="list_time">
					<div className="Times__Contain0101er-sc-1ny42po-0 gTjoUi filter-times-container groupStyle">
						<p className="base__Body02Highlight-sc-1tvbuqk-15 cACxVN filter-name labelStyle font-bold">Giờ đi</p>
						<div className="time_filter">
							{btnActive.objects.map((element, index) => {
								return (
									<Button
										key={index}
										className={toggleActiveStyle(index)}
										onClick={() => {
											const isCurrentlyActive = btnActive.objects[index] === btnActive.activeObject;

											toggleActive(index);

											// Nếu đang bấm vào chính button đang được chọn → bỏ chọn (reset danh sách)
											if (isCurrentlyActive) {
												dispatch({
													type: "GET_TRIP_PASSENGER",
													listTripPassenger: originalListTripPassenger,
												});
												return;
											}

											// console.log("check lại dữ liệu  ", listTripPassenger);

											const filteredTrips = originalListTripPassenger.filter((trip) => {
												if (!trip.startTime) return false;
												return trip.startTime >= element.timeStart && trip.startTime <= element.timeEnd;
											});

											// console.log(`Dữ liệu sau khi lọc theo khoảng ${element.filterTime}:`, filteredTrips);

											if (filteredTrips.length > 0) {
												const dataNew = filteredTrips.map((item) => ({
													...item,
													openDetail: false,
													openBooking: false,
													isOpen: false,
												}));

												dispatch({
													type: "GET_TRIP_PASSENGER",
													listTripPassenger: dataNew,
												});
											} else {
												dispatch({
													type: "GET_TRIP_PASSENGER",
													listTripPassenger: [],
												});
												message.error("Không có chuyến nào trong khoảng thời gian đã chọn");
											}
										}}
									>
										<p className="option-label">{element.time}</p>
										<p className="option-value">{element.filterTime}</p>
									</Button>
								);
							})}
						</div>
					</div>
				</div>
				<div className="filter_price">
					<p className="base__Body02Highlight-sc-1tvbuqk-15 cACxVN filter-name labelStyle font-bold">Giá vé</p>
					<Slider
						range={{draggableTrack: true}}
						step={50000}
						min={0}
						max={5000000}
						defaultValue={minmax}
						onChange={(e) => {
							setMinMax([e[0], e[1]]);
						}}
						onAfterChange={(e) => {
							const [min, max] = e;

							console.log("📦 Dữ liệu trước khi lọc theo giá:", listTripPassenger);
							console.log(`🔍 Lọc với khoảng giá: ${min.toLocaleString()} đ - ${max.toLocaleString()} đ`);

							// Lọc đúng theo passenger.price
							const filtered = originalListTripPassenger.filter((trip) => {
								return trip.passenger?.price >= min && trip.passenger?.price <= max;
							});

							console.log("✅ Dữ liệu sau khi lọc:", filtered);

							if (filtered.length > 0) {
								const dataNew = filtered.map((item) => ({
									...item,
									openDetail: false,
									openBooking: false,
									isOpen: false,
								}));

								dispatch({
									type: "GET_TRIP_PASSENGER",
									listTripPassenger: dataNew,
								});
							} else {
								dispatch({
									type: "GET_TRIP_PASSENGER",
									listTripPassenger: [],
								});
								message.error("Không có chuyến nào trong khoảng giá đã chọn");
							}
						}}
					/>
					<div className="flex justify-between">
						<div className="value-left value-info">{minmax[0].toLocaleString()} đ</div>
						<div className="value-right value-info">{minmax[1].toLocaleString()} đ</div>
					</div>
				</div>
				<div className="filter_seat">
					<p className="base__Body02Highlight-sc-1tvbuqk-15 cACxVN filter-name labelStyle font-bold">Chọn vị trí ghế</p>
					<div className="flex justify-between">
						<p class="base__Body02-sc-1tvbuqk-14 VqdXU color--darkness">Số ghế trống</p>
						<div className="QuantityInput__Container-sc-5ap7dx-0 bcpLGl quantity-input Filter_AvailableSeats flex items-center justify-center">
							<button
								disabled={gheTrong > 1 ? false : true}
								type="button"
								className="ant-btn QuantityInput__RoundButton-sc-5ap7dx-1 jHictt"
								onClick={() => {
									if (gheTrong <= 1) return;

									const newValue = gheTrong - 1;
									setGheTrong(newValue);

									const filtered = originalListTripPassenger.filter((trip) => {
										const seatList = trip.vehicle?.seatVehicle || [];
										const emptySeats = seatList.filter((seat) => seat.status === "chưa đặt").length;
										return emptySeats >= newValue;
									});

									dispatch({
										type: "GET_TRIP_PASSENGER",
										listTripPassenger: filtered,
									});
								}}
							>
								<Remove />
							</button>
							<div className="quantity-value mx-5 text-sm font-bold">
								<p className="base__SubHeadline-sc-1tvbuqk-8 jsMKgN color--darkness mb-0">{gheTrong}</p>
							</div>
							<button
								type="button"
								className="ant-btn QuantityInput__RoundButton-sc-5ap7dx-1 jHictt"
								onClick={() => {
									const newValue = gheTrong + 1;
									setGheTrong(newValue);

									const filtered = originalListTripPassenger.filter((trip) => {
										const seatList = trip.vehicle?.seatVehicle || [];
										// Đếm số ghế trống: giả định status === "available" là ghế trống
										const emptySeats = seatList.filter((seat) => seat.status === "chưa đặt").length;

										return emptySeats >= newValue;
									});

									dispatch({
										type: "GET_TRIP_PASSENGER",
										listTripPassenger: filtered,
									});
								}}
							>
								<AddCircleIcon />
							</button>
						</div>
					</div>

					{/* //Nhà xe */}
					<div className="filter_passenger mt-5">
						<p className="base__Body02Highlight-sc-1tvbuqk-15 cACxVN filter-name labelStyle font-bold">Nhà xe</p>
						<div className="mt-3 overflow-y-auto filer-passenger flex flex-col" style={{maxHeight: "100px"}}>
							{renderPassenger()}
						</div>
					</div>

					<div className="filter_typeseat mt-5">
						<p className="base__Body02Highlight-sc-1tvbuqk-15 cACxVN filter-name labelStyle font-bold">Loại ghế / giường</p>
						<div className="mt-3 filer-passenger">
							<Checkbox
								onChange={(e) => {
									if (e.target.checked) {
										dispatch(FilterSeatTripPassengerAction("seat"));
									} else {
										dispatch(getTripPassengerAction(props.id));
									}
								}}
							>
								Ghế ngồi
							</Checkbox>
							<Checkbox
								onChange={(e) => {
									if (e.target.checked) {
										dispatch(FilterSeatTripPassengerAction("bed"));
									} else {
										dispatch(getTripPassengerAction(props.id));
									}
								}}
							>
								Giường nằm
							</Checkbox>
						</div>
					</div>
				</div>
				<div className="filter_vote">
					<p className="base__Body02Highlight-sc-1tvbuqk-15 cACxVN filter-name labelStyle font-bold">Đánh giá</p>
					<Rate
						allowHalf
						defaultValue={2.5}
						onChange={(e) => {
							if (listTripPassenger.length > 0) {
								dispatch(FilterRateTripPassengerAction(e));
							} else {
								dispatch(getTripPassengerAction(props.id));
							}
						}}
					/>
				</div>
			</Card>
		</div>
	);
}
