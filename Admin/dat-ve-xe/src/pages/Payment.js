import React, {useEffect, useState} from "react";
import "../Sass/css/Payment.css";
import {message} from "antd";
import {Card, Radio, Input, Space, Collapse, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {USER_LOGIN} from "../util/settings/config";
import moment from "moment";
import {Redirect} from "react-router-dom";
import {getDetailTripPassengerAction} from "../redux/actions/tripAction";
import {getDetailTimePointDropTripAction, getDetailTimePointPickTripAction} from "../redux/actions/timePointAction";
import {SET_MODAL} from "../redux/types/ModalTypes";
import EditUserBooking from "../components/Edit/EditUserBooking";
import EditTimePoint from "../components/Edit/EditTimePoint";
import axios from "axios";
import {TICKET_BOOKING} from "../redux/types/TicketTypes";
import {Divider, Typography} from "antd";
import {Link} from "react-router-dom";
const {Text} = Typography;

export default function Payment(props) {
	const dispatch = useDispatch();
	const {ticketBooking} = useSelector((state) => state.TicketReducer);
	console.log("file: Payment.js ~ line 20 ~ Payment ~ ticketBooking", ticketBooking);
	const {tripPassengerDetail} = useSelector((state) => state.TripReducer);
	console.log("file: Payment.js ~ line 23 ~ Payment ~ tripPassengerDetail", tripPassengerDetail);

	const [voucherCode, setVoucherCode] = useState("");

	const handleApplyVoucher = async () => {
		if (!voucherCode.trim()) {
			message.warning("Vui lòng nhập mã voucher");
			return;
		}

		try {
			const response = await axios.post("http://localhost:8000/api/v1/voucher/check-used", {
				voucherCode: voucherCode.trim(),
				userId: userLogin.id,
			});

			const {used, discountValue, voucherId, message: msg} = response.data;

			if (used) {
				message.error("Bạn đã sử dụng voucher này trước đó.");
			} else {
				message.success("Voucher hợp lệ, bạn đã áp dụng.");

				// Hàm tính tiền sau giảm giá
				const newTotalAmount = calculateDiscountedAmount(ticketBooking.totalAmount, discountValue);

				// Cập nhật lại totalAmount trong ticketBooking
				dispatch({
					type: TICKET_BOOKING,
					ticketBooking: {
						...ticketBooking,
						totalAmount: newTotalAmount,
						voucherApplied: voucherCode.trim(),
						discountValue: discountValue,
						voucherId: voucherId,
					},
				});
			}
		} catch (error) {
			console.error("Lỗi kiểm tra voucher:", error);
			message.error("Lỗi khi kiểm tra voucher, vui lòng thử lại.");
		}
	};

	// Hàm tính tiền sau giảm giá theo phần trăm
	const calculateDiscountedAmount = (totalAmount, discountPercent) => {
		// discountPercent là số phần trăm, ví dụ 10 nghĩa là giảm 10%
		const discountAmount = (totalAmount * discountPercent) / 100;
		const discounted = totalAmount - discountAmount;
		return discounted > 0 ? discounted : 0; // không để âm
	};

	const {PointPickDetail, PointDropDetail} = useSelector((state) => state.PointReducer);

	const {userLogin} = useSelector((state) => state.userReducer);
	const [typePay, setTypePay] = useState("");
	const handleChangeSelect = (e) => {
		setTypePay(e.target.value);
	};

	useEffect(() => {
		if (ticketBooking) {
			localStorage.setItem("ticketBooking", JSON.stringify(ticketBooking));
		}
	}, [ticketBooking]);
	useEffect(() => {
		const storedBooking = localStorage.getItem("ticketBooking");
		if (storedBooking) {
			dispatch({
				type: TICKET_BOOKING,
				ticketBooking: JSON.parse(storedBooking),
			});
		}
	}, []);

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
		console.log("Tên nhà xe:", tripPassengerDetail.passenger?.name);

		const bookingData = {
			note: ticketBooking?.note,
			totalAmount: ticketBooking?.totalAmount,
			userId: ticketBooking?.userId,
			tripPassengerId: ticketBooking?.tripPassengerId,
			pointPickup: ticketBooking?.pointPickup,
			pointDropoff: ticketBooking?.pointDropoff,
			listSeat: (ticketBooking?.listSeat || []).map((seat) => ({id: seat.id})),
			listSeat1: ticketBooking?.listSeat || [],
			passengerName: tripPassengerDetail?.passenger?.name || "",
			voucherId: ticketBooking?.voucherId || null, // thêm voucherId đây
		};

		localStorage.setItem("ticketBooking", JSON.stringify(bookingData));

		console.log("🧾 bookingData gửi đi:", bookingData);

		dispatch({
			type: TICKET_BOOKING,
			ticketBooking: bookingData,
		});

		try {
			const response = await axios.post("http://localhost:8000/api/v1/payment", {
				totalAmount: ticketBooking.totalAmount,
				passenger: tripPassengerDetail.passenger.name,
			});
			const payData = response.data;
			if (payData.payUrl) {
				window.location.href = payData.payUrl;
			} else {
				message.error("Không nhận được liên kết thanh toán từ MoMo");
			}
		} catch (error) {
			console.error("Lỗi khi tạo giao dịch MoMo:", error);
			message.error("Thanh toán thất bại");
		}
	};

	const renderSelectedSeats = () => {
		const seats = ticketBooking?.listSeat1 || ticketBooking?.listSeat || [];
		if (!seats.length) return "Chưa chọn ghế";

		return seats.map((seat) => `Ghế ${seat.name}`).join(", ");
	};

	const formatTime = (time) => moment(time, "HH:mm:ss").format("HH:mm");

	return (
		<div className="payment">
			<div className="header-container">
				<div className="header-body">
					<div className="grid grid-cols-1">
						<div className="logo">
							<Link to="/">
								<img src="./xenhanh.png" alt="logo" style={{cursor: "pointer"}} />
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="body-container">
				<div className="body-payment">
					<div className="grid grid-cols-12 gap-8">
						<div className="col-span-8">
							<div className="header-label mb-5" style={{fontSize: 18, fontWeight: 600}}>
								Phương thức thanh toán
							</div>

							<Card
								style={{
									width: "100%",
									height: "100%",
									border: "1px solid #d9d9d9",
									borderRadius: 10,
									boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
									padding: 20,
								}}
							>
								<Radio.Group onChange={handleChangeSelect} value={typePay} style={{width: "100%"}}>
									<Space direction="vertical" style={{width: "100%"}} size="large">
										{/* Ví MoMo */}
										<div
											style={{
												border: "1px solid #eaeaea",
												borderRadius: 8,
												padding: "16px 20px",
												cursor: "pointer",
												backgroundColor: typePay === 2 ? "#f6faff" : "#fff",
											}}
										>
											<Radio value={2} style={{width: "100%"}}>
												<div style={{display: "flex", alignItems: "center"}}>
													<img src="https://storage.googleapis.com/fe-production/httpImage/momo.svg" alt="MoMo" style={{width: 36, height: 36}} />
													<div style={{marginLeft: 12}}>
														<div style={{fontWeight: 600, fontSize: 16}}>Thanh toán qua Ví MoMo</div>
														<div style={{fontSize: 13, color: "#666"}}>Yêu cầu cài đặt ứng dụng MoMo trên điện thoại</div>
													</div>
												</div>
											</Radio>

											{/* Nội dung hướng dẫn luôn hiển thị */}
											<div style={{marginTop: 12, fontSize: 14, color: "#333"}}>
												<div style={{fontWeight: 600, marginBottom: 8}}>Hướng dẫn thanh toán:</div>
												<ol style={{paddingLeft: 20, margin: 0}}>
													<li>Bạn sẽ được chuyển đến ứng dụng MoMo</li>
													<li>Chọn thẻ hoặc ví MoMo đã liên kết</li>
													<li>Nhấn "Thanh toán" để hoàn tất giao dịch</li>
												</ol>
											</div>
										</div>

										{/* Bạn có thể thêm các phương thức khác ở đây tương tự */}
									</Space>
								</Radio.Group>
							</Card>
						</div>
						<div className="col-span-4">
							<div class="header-label mb-5">Thông tin chuyến đi</div>

							<Card
								style={{
									width: "100%",
									border: "1px solid #ccc",
									borderRadius: 8,
									padding: 16,
								}}
							>
								<div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
									<Text strong>Hành khách</Text>
									<Button
										type="link"
										size="small"
										onClick={() =>
											dispatch({
												type: SET_MODAL,
												title: "Sửa thông tin",
												content: <EditUserBooking id={userLogin.id} />,
											})
										}
									>
										<img height={11} src="https://storage.googleapis.com/fe-production/svgIcon/pen-blue.svg" style={{marginRight: 4}} alt="edit" />
										Sửa
									</Button>
								</div>
								<Text>{userLogin.name}</Text>
								<div style={{marginTop: 8}}>
									<Text strong>Số điện thoại: </Text> {userLogin.numberPhone}
								</div>
								<div>
									<Text strong>Email: </Text> {userLogin.email}
								</div>

								<Divider />

								<div>
									<Text strong>Nhà xe: </Text> {tripPassengerDetail?.passenger?.name}
								</div>

								<Divider />

								{/* Điểm đón */}
								<div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4}}>
									<Text strong>Điểm đón</Text>
									<Button
										type="link"
										size="small"
										onClick={() =>
											dispatch({
												type: SET_MODAL,
												content: <EditTimePoint tripPassengerId={tripPassengerDetail.id} id={PointPickDetail.id} type="pickup" />,
												title: "Cập nhật điểm đón",
											})
										}
									>
										<img height={11} src="https://storage.googleapis.com/fe-production/svgIcon/pen-blue.svg" style={{marginRight: 4}} alt="edit" />
										Sửa
									</Button>
								</div>
								<div style={{whiteSpace: "pre-wrap", marginBottom: 12}}>
									<Text strong>{formatTime(PointPickDetail?.time)}</Text> - <Text>{moment(tripPassengerDetail?.trip?.startTime).format("DD-MM-YYYY")}</Text> <div>{PointPickDetail?.point?.name}</div>
								</div>

								{/* Điểm trả */}
								<div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4}}>
									<Text strong>Điểm trả</Text>
									<Button
										type="link"
										size="small"
										onClick={() =>
											dispatch({
												type: SET_MODAL,
												content: <EditTimePoint tripPassengerId={tripPassengerDetail.id} id={PointDropDetail.id} type="dropoff" />,
												title: "Cập nhật điểm trả",
											})
										}
									>
										<img height={11} src="https://storage.googleapis.com/fe-production/svgIcon/pen-blue.svg" style={{marginRight: 4}} alt="edit" />
										Sửa
									</Button>
								</div>

								<div style={{whiteSpace: "pre-wrap", marginBottom: 12}}>
									<Text strong>{formatTime(PointDropDetail?.time)}</Text> - <Text>{moment(tripPassengerDetail?.trip?.startTime).format("DD-MM-YYYY")}</Text> <div>{PointDropDetail?.point?.name}</div>
								</div>

								<div>
									<Text strong>Ghế đã chọn: </Text>
									<Text>{renderSelectedSeats()}</Text>
								</div>
								<Divider />

								<Space size="middle" className="mb-4" style={{width: "100% ,marginBottom: 16"}}>
									<Input placeholder="Nhập mã voucher" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} style={{flex: 1, maxWidth: 250}} />
									<Button type="primary" onClick={handleApplyVoucher} disabled={!voucherCode.trim()}>
										Áp dụng
									</Button>
								</Space>

								<div style={{display: "flex", justifyContent: "space-between", marginBottom: 8}}>
									<Text strong>Tổng tiền ban đầu</Text>
									<Text>{(ticketBooking.totalAmount / (1 - (ticketBooking.discountValue || 0) / 100))?.toLocaleString()} VNĐ</Text>
								</div>
								<div style={{display: "flex", justifyContent: "space-between", marginBottom: 8}}>
									<Text strong>Giảm giá</Text>
									<Text style={{color: "#52c41a"}}>{(((ticketBooking.discountValue || 0) / 100) * (ticketBooking.totalAmount / (1 - (ticketBooking.discountValue || 0) / 100)))?.toLocaleString()} VNĐ</Text>
								</div>

								<div style={{display: "flex", justifyContent: "space-between"}}>
									<Text strong>Tổng thanh toán</Text>
									<Text style={{fontWeight: 600, color: "#cf1322"}}>{ticketBooking?.totalAmount?.toLocaleString()} VNĐ</Text>
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
