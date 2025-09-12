import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {CheckCircleIcon} from "@heroicons/react/solid";
import {bookingTicketAction} from "../redux/actions/bookingAction";
import axios from "axios";
import {TICKET_BOOKING} from "../redux/types/TicketTypes";

const PaymentSuccess = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		const savedBooking = localStorage.getItem("ticketBooking");
		if (savedBooking) {
			const bookingData = JSON.parse(savedBooking);
			dispatch({
				type: TICKET_BOOKING,
				ticketBooking: bookingData,
			});
		}
	}, []);

	// const ticketBooking = useSelector((state) => state.TicketReducer.ticketBooking);
	const tripPassengerDetail = useSelector((state) => state.TripReducer.tripPassengerDetail);

	const {ticketBooking} = useSelector((state) => state.TicketReducer);

	console.log("✅ ticketBooking từ Redux:", ticketBooking);

	useEffect(() => {
		console.log("Thông tin vé ticketBooking:", ticketBooking);
		console.log("Thông tin chuyến đi tripPassengerDetail:", tripPassengerDetail);

		// Chuẩn bị dữ liệu gửi lên backend
		const bookingData = {
			note: ticketBooking?.note,
			totalAmount: ticketBooking?.totalAmount,
			userId: ticketBooking?.userId,
			tripPassengerId: ticketBooking?.tripPassengerId,
			pointPickup: ticketBooking?.pointPickup,
			pointDropoff: ticketBooking?.pointDropoff,
			listSeat: ticketBooking?.listSeat || [],
			passengerName: tripPassengerDetail?.passenger?.name || "",
		};

		const sendBookingData = async () => {
			try {
				const response = await axios.post("http://localhost:8000/api/v1/ticket/booking", bookingData);
				console.log("✅ Đặt vé thành công:", response.data);
				// Có thể hiển thị thông báo thành công, redirect, hoặc lưu ticketId nếu cần
			} catch (error) {
				console.error("❌ Lỗi khi đặt vé:", error?.response?.data || error.message);
			}
		};

		// In dữ liệu ra console thay vì gọi API
		if (ticketBooking && tripPassengerDetail) {
			console.log("Dữ liệu chuẩn bị gửi lên backend:", bookingData);
			sendBookingData();
		}
	}, [ticketBooking, tripPassengerDetail]);

	const handleGoToMyTickets = () => {
		dispatch(bookingTicketAction(ticketBooking, tripPassengerDetail?.passenger));
		history.push("/ticketmgt");
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 px-4">
			<div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
				<CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4" />
				<h1 className="text-2xl font-bold text-green-600 mb-2">Thanh toán thành công!</h1>
				<p className="text-gray-600 mb-4">Cảm ơn bạn đã đặt vé. Thanh toán đã được ghi nhận qua ví MoMo.</p>
				<button onClick={handleGoToMyTickets} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300">
					Vé của tôi
				</button>
			</div>
		</div>
	);
};

export default PaymentSuccess;
