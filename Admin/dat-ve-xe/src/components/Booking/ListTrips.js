import React, {useEffect, useState} from "react";
import {Card, Button, Tag} from "antd";
import {StarFilled} from "@ant-design/icons";
import Details from "./Details";
import Collapse from "@mui/material/Collapse";
import ShareIcon from "@mui/icons-material/Share";
import {styled} from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import StepBooking from "./StepBooking";
import {DOMAIN, TOKEN} from "../../util/settings/config";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {getImgVehicleAction} from "../../redux/actions/bookingAction";
import {OPEN_CLOSE_BOOKING, OPEN_CLOSE_DETAILS} from "../../redux/types/BookingTypes";
import {getImageVehicleAction, getSeatVehicleAction} from "../../redux/actions/vehicleAction";
import {getTimePointTripAction} from "../../redux/actions/timePointAction";

import LoadingSpin from "../Loading/LoadingSpin";
import {SortPriceTripPassengerAction, SortTimeTripPassengerAction} from "../../redux/actions/tripAction";
export default function ListTrips(props) {
	let {tripSearch, listTripPassenger, listImgVehicle, tripRender} = useSelector((state) => state.BookingReducer);
	const {isLoadingSpin} = useSelector((state) => state.LoadingReducer);
	const {param} = props;
	const dispatch = useDispatch();
	console.log("danh sách chuyến xe nhận được ", listTripPassenger);

	const [seatVehicleMap, setSeatVehicleMap] = useState({}); // key = vehicleId hoặc tripPassengerId, value = danh sách ghế

	const getDuration = (startTime, endTime) => {
		const [startHour, startMinute] = startTime.split(":").map(Number);
		const [endHour, endMinute] = endTime.split(":").map(Number);

		// Chuyển tất cả thành phút
		const startTotalMinutes = startHour * 60 + startMinute;
		const endTotalMinutes = endHour * 60 + endMinute;

		// Trường hợp qua ngày (ví dụ 22:00 -> 04:00 hôm sau)
		const durationInMinutes = endTotalMinutes >= startTotalMinutes ? endTotalMinutes - startTotalMinutes : 24 * 60 - startTotalMinutes + endTotalMinutes;

		const hours = Math.floor(durationInMinutes / 60);
		const minutes = durationInMinutes % 60;

		return `${hours}h${minutes > 0 ? minutes + "m" : ""}`;
	};

	// Khi listTripPassenger thay đổi, fetch ghế tương ứng cho từng tripPassenger
	useEffect(() => {
		if (!listTripPassenger || listTripPassenger.length === 0) return;

		// Giả sử API endpoint: /api/v1/tripseat/{tripPassengerId}
		listTripPassenger.forEach(async (item) => {
			if (item.status === "depart") {
				try {
					const res = await fetch(`${DOMAIN}tripseat/${item.id}`);
					const data = await res.json();
					setSeatVehicleMap((prev) => ({
						...prev,
						[item.id]: data,
					}));
				} catch (error) {
					console.error("Lỗi lấy ghế cho tripPassenger", item.id, error);
				}
			}
		});
	}, [listTripPassenger]);

	const handleExpandStepClick = (id) => {
		dispatch({
			type: OPEN_CLOSE_BOOKING,
			id: id,
		});
	};
	const handleExpandClick = (id) => {
		dispatch({
			type: OPEN_CLOSE_DETAILS,
			id: id,
		});
	};
	const ExpandMore = styled((props) => {
		const {expand, ...other} = props;
		return <IconButton {...other} />;
	})(({theme, expand}) => ({
		transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	}));
	const renderTripPassenger = () => {
		return listTripPassenger?.map((item, index) => {
			if (item.status == "depart") {
				const seats = seatVehicleMap[item.id] || [];
				const numberBlank = seats.filter((x) => x.status === "available").length;
				let avgRatePassenger = _.meanBy(item.passenger.passengerRate, (rate) => rate.numberRate).toFixed(2);
				return (
					<Card style={{width: "100%"}} key={index}>
						<div className="grid grid-cols-12" style={{minHeight: "180px"}}>
							<div className="col-span-3 logo-trips">
								<div
									className="image"
									style={{
										position: "relative",
									}}
								>
									<img
										className="operator lazyloaded"
										src={item.passenger.imageIntro}
										alt="Img"
										style={{
											width: "100%",
											height: "80%", // ép ảnh cao lên theo container
											objectFit: "fill", // kéo dãn ảnh để vừa khung (có thể méo)
											display: "block",
										}}
									/>
								</div>
							</div>
							<div className="col-span-9 mb-10">
								<div className="bus-info flex justify-between">
									<div className="bus-name">
										<span className="bus-title">{item.passenger.name}</span>
										<button type="button" className="ant-btn bus-rating-button">
											<div className="bus-rating">
												<StarFilled />
												<span>
													{avgRatePassenger} ({item.passenger.passengerRate.length == 0 ? "" : item.passenger.passengerRate.length})
												</span>
											</div>
										</button>
									</div>
									<div class="fare">
										<div>{item.passenger.price.toLocaleString()} VNĐ</div>
									</div>
								</div>
								<div className="seat-type">{item.vehicle.name}</div>
								<div className="from-to">
									<svg className="TicketPC__LocationRouteSVG-sc-1mxgwjh-4 eKNjJr" xmlns="http://www.w3.org/2000/svg" width={14} height={74} viewBox="0 0 14 74">
										<path fill="none" stroke="#787878" strokeLinecap="round" strokeWidth={2} strokeDasharray="0 7" d="M7 13.5v46" />
										<g fill="none" stroke="#484848" strokeWidth={3}>
											<circle cx={7} cy={7} r={7} stroke="none" />
											<circle cx={7} cy={7} r="5.5" />
										</g>
										<path d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z" fill="#787878" />
									</svg>
									<div className="from-to-content">
										<div className="content from">
											<div className="hour">{item.startTime}</div>
											<div className="place">• {item.trip.from.name}</div>
										</div>
										<div className="duration">{getDuration(item.startTime, item.endTime)}</div>

										<div className="content to">
											<div className="hour">{item.endTime}</div>
											<div className="place">• {item.trip.to.name}</div>
										</div>
									</div>
								</div>
								<div className="flex flex-wrap" style={{width: "20%", marginRight: "auto"}}>
									<Tag color="#2db7f5" className="my-3">
										Xe chạy đúng giờ
									</Tag>
									<Tag color="red" className="my-3">
										Sạch sẽ
									</Tag>
									<Tag color="orange" className="my-3">
										Wifi miễn phí
									</Tag>
									<Tag color="purple" className="my-3">
										Có nước uống
									</Tag>
								</div>
								<div className="ticket_pc">
									<div className="info">
										<div className="seat-available ">{numberBlank} chỗ trống</div>
									</div>
									<div className="action">
										<button
											type="button"
											className="ant-btn btn-detail ant-btn-link"
											onClick={() => {
												handleExpandClick(item.id);
												dispatch(getImageVehicleAction(item.vehicleId));
											}}
										>
											<span>Thông tin chi tiết</span>
											<ExpandMore expand={item.openDetail} aria-expanded={item.openDetail} aria-label="show more">
												<ExpandMoreIcon />
											</ExpandMore>
										</button>
										<button
											data-tracking-event="selected_route"
											type="button"
											className="ant-btn btn-booking booking hover:bg-sky-700"
											onClick={() => {
												handleExpandStepClick(item.id);
												dispatch(getSeatVehicleAction(item.vehicleId));
												dispatch(getTimePointTripAction(item.id));
											}}
										>
											<span>{item.openBooking ? "Đóng" : "Chọn chuyến"}</span>
										</button>
									</div>
								</div>
							</div>
						</div>
						<Collapse in={item.openDetail} timeout="auto" unmountOnExit>
							<Details passenger={item.passenger} avgRate={avgRatePassenger} id={item.id} trip={item.trip} index={index} start={param.start} tripPassenger={item} />
							{/* {isLoadingSpin ? <LoadingSpin /> : <Details passenger={item.passenger} avgRate={avgRatePassenger} id={item.id} trip={item.trip} index={index} start={param.start} tripPassenger={item} />} */}
						</Collapse>
						<Collapse in={item.openBooking} timeout="auto" unmountOnExit>
							<StepBooking vehicle={item.vehicle} trip={item.trip} tripPassenger={item} />
						</Collapse>
					</Card>
				);
			}
		});
	};
	return (
		<div className="list_trips">
			<div className="trip-style">
				<h1 id="seo-heading">
					{listTripPassenger.filter((item) => item.status === "depart").length} kết quả chuyến xe từ {tripRender.fromStation} đến {tripRender.toStation}
				</h1>
				<div className="sort">
					<span className="sort-label mr-5">Sắp xếp theo:</span>
					<button
						type="button"
						className="ant-btn"
						onClick={() => {
							let tripSort = {
								tripId: param.id,
								attribute: "startTime",
								type: "ASC",
							};
							dispatch(SortTimeTripPassengerAction(tripSort));
						}}
					>
						<span>Giờ sớm nhất</span>
					</button>
					<button
						type="button"
						className="ant-btn"
						onClick={() => {
							let tripSort = {
								tripId: param.id,
								attribute: "startTime",
								type: "DESC",
							};
							dispatch(SortTimeTripPassengerAction(tripSort));
						}}
					>
						<span>Giờ muộn nhất</span>
					</button>
					<button
						type="button"
						className="ant-btn"
						onClick={() => {
							let tripSort = {
								tripId: param.id,
								attribute: "price",
								type: "ASC",
							};
							dispatch(SortPriceTripPassengerAction(tripSort));
						}}
					>
						<span>Giá thấp nhất</span>
					</button>
					<button
						type="button"
						className="ant-btn"
						onClick={() => {
							let tripSort = {
								tripId: param.id,
								attribute: "price",
								type: "DESC",
							};
							dispatch(SortPriceTripPassengerAction(tripSort));
						}}
					>
						<span>Giá cao nhất</span>
					</button>
				</div>
				<div className="list_card_trips mt-5">{renderTripPassenger()}</div>
			</div>
		</div>
	);
}
