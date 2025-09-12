import React, {useEffect, useState} from "react";
import "../Sass/css/Payment.css";
import {Row, Col, message} from "antd";
import {List, Avatar, Card, Radio, Input, Space, Collapse, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {USER_LOGIN} from "../util/settings/config";
import {getDetailPassenger} from "../redux/actions/passengerAction";
import moment from "moment";
import {Redirect} from "react-router-dom";
import {getDetailTripPassengerAction} from "../redux/actions/tripAction";
import {getDetailPointDropAction, getDetailPointPickDropAction} from "../redux/actions/pointAction";
import {getDetailTimePointDropTripAction, getDetailTimePointPickTripAction} from "../redux/actions/timePointAction";
import {SET_MODAL} from "../redux/types/ModalTypes";
import EditUserBooking from "../components/Edit/EditUserBooking";
import EditTimePoint from "../components/Edit/EditTimePoint";
import {PayAction} from "../redux/actions/payAction";
import {bookingTicketAction} from "../redux/actions/bookingAction";
import axios from "axios";
import {TICKET_BOOKING} from "../redux/types/TicketTypes";

export default function Payment(props) {
	const dispatch = useDispatch();
	const {ticketBooking} = useSelector((state) => state.TicketReducer);
	console.log("file: Payment.js ~ line 20 ~ Payment ~ ticketBooking", ticketBooking);
	const {tripPassengerDetail} = useSelector((state) => state.TripReducer);
	console.log("file: Payment.js ~ line 23 ~ Payment ~ tripPassengerDetail", tripPassengerDetail);

	const {PointPickDetail, PointDropDetail} = useSelector((state) => state.PointReducer);

	const {userLogin} = useSelector((state) => state.userReducer);
	const [typePay, setTypePay] = useState("");
	const handleChangeSelect = (e) => {
		setTypePay(e.target.value);
	};
	useEffect(() => {
		dispatch(getDetailTripPassengerAction(ticketBooking.tripPassengerId));
		dispatch(getDetailTimePointDropTripAction(ticketBooking.pointDropoff));
		dispatch(getDetailTimePointPickTripAction(ticketBooking.pointPickup));
	}, [ticketBooking]);
	if (!localStorage.getItem(USER_LOGIN)) {
		alert("Bạn không có quyền truy cập vào trang này !");
		return <Redirect to="/" />;
	}

	const handlePayment = async () => {
		if (!typePay) {
			message.error("Vui lòng chọn phương thức thanh toán");
			return;
		}
		console.log("Tên nhà xe:", tripPassengerDetail.passenger?.name); // 🛑 In rõ tại đây

		const bookingData = {
			note: ticketBooking?.note,
			totalAmount: ticketBooking?.totalAmount,
			userId: ticketBooking?.userId,
			tripPassengerId: ticketBooking?.tripPassengerId,
			pointPickup: ticketBooking?.pointPickup,
			pointDropoff: ticketBooking?.pointDropoff,
			listSeat: (ticketBooking?.listSeat || []).map((seat) => ({id: seat.id})),
			passengerName: tripPassengerDetail?.passenger?.name || "",
		};

		localStorage.setItem("ticketBooking", JSON.stringify(bookingData));

		console.log("🧾 bookingData gửi đi:", bookingData); // 👈 In ra kiểm tra tại đây

		dispatch({
			type: TICKET_BOOKING,
			ticketBooking: bookingData, // 👈 đúng key theo reducer
		});

		try {
			const response = await axios.post("http://localhost:8000/api/v1/payment", {
				totalAmount: ticketBooking.totalAmount,
				passenger: tripPassengerDetail.passenger.name,
			});

			// Axios tự động parse JSON rồi, không cần JSON.parse
			const payData = response.data;

			if (payData.payUrl) {
				// Chuyển hướng đến trang thanh toán MoMo
				window.location.href = payData.payUrl;
			} else {
				message.error("Không nhận được liên kết thanh toán từ MoMo");
			}
		} catch (error) {
			console.error("Lỗi khi tạo giao dịch MoMo:", error);
			message.error("Thanh toán thất bại");
		}
	};

	return (
		<div className="payment">
			<div className="header-container">
				<div className="header-body">
					<div className="grid grid-cols-1">
						<div className="logo">
							<img src="https://storage.googleapis.com/fe-production/icon_vxr_full.svg" alt="logo" />
						</div>
					</div>
				</div>
			</div>
			<div className="body-container">
				<div className="body-payment">
					<div className="grid grid-cols-12 gap-8">
						<div className="col-span-8">
							<div class="header-label mb-5">Phương thức thanh toán</div>
							<Card style={{width: "100%", height: "auto", border: " 1px solid rgb(192, 192, 192)"}}>
								<Radio.Group style={{width: "100%"}} onChange={handleChangeSelect}>
									<Space direction="vertical" style={{width: "100%"}}>
										<div style={{borderBottom: "1px solid rgb(227, 227, 227)", padding: "20px 0", width: "100%"}}>
											<Radio value={2} style={{width: "100%"}}>
												<span className="flex items-center" style={{paddingRight: 8}}>
													<img src="https://storage.googleapis.com/fe-production/httpImage/momo.svg" alt="MOMO_PAY_APP" className="ofcui" />
													<p className="title mb-0 ml-2">Ví MoMo</p>
												</span>
											</Radio>
											<div className="detail-content-container">
												<p className="mb-0">Điện thoại của bạn phải được cài đặt ứng dụng MoMo</p>
											</div>
											<Collapse defaultActiveKey={["1"]}>
												<div className="ant-collapse-content-box">
													<span className="payment-method">Hướng dẫn thanh toán</span>
													<div className="payment-hd">
														<p>
															1. Bạn sẽ được chuyển đến ứng dụng Momo
															<br />
															2. Nhập thông tin thẻ thanh toán mới hoặc chọn thanh toán qua ví Momo/thẻ đã liên kết với ví Momo
															<br />
															3. Chọn "Thanh toán" để tiến thành thanh toán vé
														</p>
													</div>
												</div>
											</Collapse>
										</div>
									</Space>
								</Radio.Group>
							</Card>
						</div>
						<div className="col-span-4">
							<div class="header-label mb-5">Thông tin chuyến đi</div>

							<Card style={{width: "100%", height: "auto", border: " 1px solid rgb(192, 192, 192)"}}>
								<div className="table-info">
									<div className="edit-info">
										<div className="label">Hành khách</div>
										<div className="edit">
											<div
												style={{color: "#0060C4", cursor: "pointer", fontWeight: "normal"}}
												className="edit-btn"
												onClick={() => {
													dispatch({
														type: SET_MODAL,
														title: "Sửa thông tin",
														content: <EditUserBooking id={userLogin.id} />,
													});
												}}
											>
												<img height={11} src="https://storage.googleapis.com/fe-production/svgIcon/pen-blue.svg" style={{margin: "0px 4px 0px 0px"}} className="StyledComponents__Icon-sc-1dlqkzu-31 fizJfc" />
												Sửa
											</div>
										</div>
									</div>
									<div className="value">{userLogin.name}</div>
									<div className="edit-info">
										<div className="label">Số điện thoại</div>
									</div>
									<div className="value">{userLogin.numberPhone}</div>
									<div className="edit-info">
										<div className="label">Email</div>
									</div>
									<div className="value">{userLogin.email}</div>

									<div className="row-divider" />
									<div className="edit-info">
										<div className="label">Nhà xe</div>
									</div>
									<div className="value">{tripPassengerDetail?.passenger?.name}</div>
									<div className="edit-info">
										<div className="label">Điểm đón (dự kiến)</div>
										<div className="edit">
											<div
												style={{color: "#0060C4", cursor: "pointer", fontWeight: "normal"}}
												className=""
												onClick={() => {
													dispatch({
														type: SET_MODAL,
														content: <EditTimePoint tripPassengerId={tripPassengerDetail.id} id={PointPickDetail.id} type="pickup" />,
														title: "Cập nhật điểm",
													});
												}}
											>
												<img height={11} src="https://storage.googleapis.com/fe-production/svgIcon/pen-blue.svg" style={{margin: "0px 4px 0px 0px"}} className="StyledComponents__Icon-sc-1dlqkzu-31 fizJfc" />
												Sửa
											</div>
										</div>
									</div>
									<div className="value">
										<div style={{whiteSpace: "pre-wrap"}}>
											{PointPickDetail?.time} - {moment(tripPassengerDetail?.trip?.startTime).format("DD-MM-YYYY")} {PointPickDetail?.point?.name}
										</div>
									</div>
									<div className="edit-info">
										<div className="label">Điểm trả (dự kiến)</div>
										<div className="edit">
											<div
												style={{color: "#0060C4", cursor: "pointer", fontWeight: "normal"}}
												className=""
												onClick={() => {
													dispatch({
														type: SET_MODAL,
														content: <EditTimePoint tripPassengerId={tripPassengerDetail.id} id={PointDropDetail.id} type="dropoff" />,
														title: "Cập nhật điểm",
													});
												}}
											>
												<img height={11} src="https://storage.googleapis.com/fe-production/svgIcon/pen-blue.svg" style={{margin: "0px 4px 0px 0px"}} className="StyledComponents__Icon-sc-1dlqkzu-31 fizJfc" />
												Sửa
											</div>
										</div>
									</div>
									<div className="value">
										<div style={{whiteSpace: "pre-wrap"}}>
											{" "}
											{PointDropDetail?.time} - {moment(tripPassengerDetail?.trip?.startTime).format("DD-MM-YYYY")} {PointDropDetail?.point?.name}
										</div>
									</div>
									<div className="edit-info">
										<div className="label">Tổng phải thanh toán</div>
									</div>
									<div className="value">
										<div style={{whiteSpace: "pre-wrap"}}>{ticketBooking?.totalAmount?.toLocaleString()} VNĐ</div>
									</div>
								</div>
							</Card>
							<Button type="primary" style={{width: "100%", marginTop: "20px"}} disabled={!tripPassengerDetail?.passenger?.name} className="btn-payment" onClick={handlePayment}>
								Thanh toán
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
