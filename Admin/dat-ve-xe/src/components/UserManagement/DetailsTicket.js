import {Badge, Rate, Input, Button, message, Spin} from "antd";
import moment from "moment";
import {useEffect, useState} from "react";
import {DOMAIN, TOKEN} from "../../util/settings/config";
import axios from "axios";

export default function DetailsTicket({ticket}) {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [existingRating, setExistingRating] = useState(null);
	const [existingComment, setExistingComment] = useState(null);
	const [loading, setLoading] = useState(true);

	const passengerId = ticket.tripPassengerTicket.passenger.id;

	const userId = ticket.user.id;

	useEffect(() => {
		if (!ticket || !ticket.tripPassengerTicket || !ticket.user) return;

		setExistingComment(null);
		setExistingRating(null);
		setLoading(true);

		const fetchData = async () => {
			try {
				const [commentRes, rateRes] = await Promise.all([axios.get(`${DOMAIN}comment?passengerId=${passengerId}`), axios.get(`${DOMAIN}rate/${passengerId}`)]);

				const userComment = commentRes.data.find((c) => c.userId === userId);
				const userRate = rateRes.data.find((r) => r.userId === userId);

				if (userComment) setExistingComment(userComment);
				if (userRate) setExistingRating(userRate.numberRate);
			} catch (err) {
				console.error(err);
				message.error("Không thể kiểm tra đánh giá.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [ticket]);

	console.log("Check ticket", ticket);

	const handleSubmit = async () => {
		try {
			await axios.post(`${DOMAIN}rate`, {
				numberRate: rating,
				userId,
				passengerId,
			});

			await axios.post(`${DOMAIN}comment`, {
				content: comment,
				userId,
				passengerId,
			});

			message.success("Gửi đánh giá thành công!");
			setExistingRating(rating);
			setExistingComment({content: comment});
		} catch (error) {
			message.error("Lỗi khi gửi đánh giá: " + error.message);
		}
	};

	const renderPoint = (typePoint) => {
		const point = ticket.ticketPointId.find((obj) => obj.typePoint === typePoint);
		return (
			<span>
				{point?.timepointTicket?.point.name} - {point?.timepointTicket?.point.address}
			</span>
		);
	};

	const renderSeat = () => {
		if (!ticket.listSeat1 || ticket.listSeat1.length === 0) return "Chưa chọn ghế";

		return ticket.listSeat1.map((seat, index) => (
			<div key={index}>
				Ghế {seat.name} - Vị trí Tầng {seat.floor}
			</div>
		));
	};

	return (
		<div className="bg-white shadow-md rounded-lg p-6 space-y-10 text-sm">
			{/* --- Thông tin người đặt --- */}
			<Section title="Thông tin người đặt">
				<Item label="Họ tên" value={ticket.user.name} />
				<Item label="Số điện thoại" value={ticket.user.numberPhone} />
				{/* <Item label="Thời gian đặt vé" value={moment(ticket.createAt).format("DD-MM-YYYY HH:mm:ss")} /> */}
			</Section>

			{/* --- Thông tin chuyến đi --- */}
			<Section title="Thông tin chuyến đi">
				<Item label="Nhà xe" value={ticket.tripPassengerTicket.passenger.name} />
				<Item label="Trung tâm nhận vé" value={ticket.tripPassengerTicket.trip.from.name} />
				<Item label="Khởi hành" value={`${moment(ticket.tripPassengerTicket.trip?.startTime).format("DD-MM-YYYY")} ${ticket.tripPassengerTicket.startTime}`} />
				<Item label="Kết thúc" value={`${moment(ticket.tripPassengerTicket.trip?.endTime).format("DD-MM-YYYY")} ${ticket.tripPassengerTicket.endTime}`} />
				<Item label="Điểm đón" value={renderPoint("dropoff")} />
				<Item label="Điểm trả" value={renderPoint("pickup")} />
			</Section>

			{/* --- Thông tin vé --- */}
			<Section title="Thông tin vé">
				<Item label="Mã vé" value={`Vé số ${ticket.id}`} />
				<Item label="Trạng thái vé" value={<Badge status="processing" text={ticket.status} />} />
				<Item label="Ghế đã đặt" value={renderSeat()} />
				<Item label="Tổng tiền" value={`${ticket.totalAmount?.toLocaleString()} VNĐ`} />
			</Section>
			{/* --- Lưu ý --- */}
			<div>
				<h3 className="text-base font-semibold mb-2">Lưu ý</h3>
				<p className="text-gray-600">Mọi thủ tục vui lòng đến nhà xe thông tin trên vé. Nhà xe không chịu trách nhiệm.</p>
			</div>

			{/* --- Đánh giá --- */}
			<div>
				<h3 className="text-base font-semibold mb-2">Đánh giá nhà xe - {ticket.tripPassengerTicket.passenger.name}</h3>
				{loading ? (
					<Spin />
				) : existingRating !== null && existingComment !== null ? (
					<p className="text-green-600 font-medium mt-2">Bạn đã đánh giá nhà xe này rồi.</p>
				) : (
					<div className="mt-2">
						<Rate value={rating} onChange={setRating} />
						<Input.TextArea rows={3} className="mt-3" placeholder="Nhập nội dung đánh giá..." value={comment} onChange={(e) => setComment(e.target.value)} />
						<Button type="primary" className="mt-3" onClick={handleSubmit}>
							Gửi đánh giá
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

function Section({title, icon, children}) {
	return (
		<div className="border border-gray-300 rounded-md p-5 bg-white shadow-sm">
			<h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
				{icon && <span className="text-xl">{icon}</span>}
				{title}
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
		</div>
	);
}

function Item({label, value}) {
	return (
		<div className="flex flex-col gap-1">
			<span className="font-semibold text-gray-800">{label}</span>
			<div className="text-gray-900">{value}</div>
		</div>
	);
}
