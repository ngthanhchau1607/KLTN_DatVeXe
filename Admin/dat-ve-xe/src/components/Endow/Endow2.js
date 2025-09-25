import React, {useEffect, useState} from "react";

const Endow2 = () => {
	const [countdown, setCountdown] = useState("");
	const [isFlashSale, setIsFlashSale] = useState(false);
	const promoCode = "FLASH50"; // Mã giảm giá 6 ký tự

	useEffect(() => {
		const calculateCountdown = () => {
			const now = new Date();

			// Tìm thứ 3 tuần này hoặc tuần sau
			const dayOfWeek = now.getDay(); // Chủ nhật=0, Thứ 3=2
			const daysUntilTuesday = (2 - dayOfWeek + 7) % 7; // số ngày tới Thứ 3

			// Thời điểm bắt đầu flash sale: Thứ 3, 12:00:00
			const flashStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + daysUntilTuesday, 12, 0, 0);

			// Thời điểm kết thúc flash sale: Thứ 3, 14:00:00
			const flashEnd = new Date(flashStart.getFullYear(), flashStart.getMonth(), flashStart.getDate(), 14, 0, 0);

			if (now >= flashStart && now <= flashEnd) {
				setIsFlashSale(true);
				setCountdown("Flash sale đang diễn ra!");
				return;
			} else {
				setIsFlashSale(false);
			}

			let target = flashStart;
			if (now > flashEnd) {
				// Nếu đã qua khung giờ flash sale tuần này, tính sang tuần sau
				target = new Date(flashStart.getFullYear(), flashStart.getMonth(), flashStart.getDate() + 7, 12, 0, 0);
			}

			const distance = target - now;

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			setCountdown(`${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`);
		};

		calculateCountdown();
		const interval = setInterval(calculateCountdown, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-6">12h - 14h Thứ 3 - Flash sale đến 50%</h1>

			<img src="http://localhost:3000/images/ud/ud2.jpeg" alt="Flash sale 12h - 14h Thứ 3" className="w-full h-auto rounded-md shadow-md mb-6" />

			{/* Đếm ngược và mã khuyến mãi */}
			<div className="bg-red-100 border-l-4 border-red-500 text-red-800 px-4 py-4 mb-6 rounded-md">
				<p className="font-semibold mb-2">⏳ Đếm ngược đến Flash sale Thứ 3, 12h - 14h:</p>
				<p className="text-lg font-bold">{countdown}</p>

				{/* Mã giảm giá luôn hiển thị */}
				<div className="mt-4 p-4 bg-white border border-dashed border-red-600 rounded-md text-center">
					<p className="text-red-700 font-semibold text-lg mb-1">🎉 Mã giảm giá:</p>
					<p className="text-2xl font-bold text-red-800 tracking-widest">{promoCode}</p>
					<p className="text-sm text-gray-600 mt-2">Giảm 50% tối đa 50.000đ</p>
				</div>
			</div>

			{/* Nội dung chính */}
			<div className="text-base md:text-lg leading-relaxed text-gray-800 space-y-4">
				<p>
					Mỗi tuần vào <strong>Thứ 3 từ 12h đến 14h</strong>, VeXeRe tổ chức Flash Sale với ưu đãi giảm đến 50% dành cho nhiều nhà xe uy tín. Đây là cơ hội vàng để bạn săn vé giá rẻ cho những chuyến đi trong tương lai.
				</p>

				<p>Chương trình diễn ra trong khung giờ cố định nên hãy chuẩn bị kỹ lưỡng để không bỏ lỡ nhé!</p>

				<p>
					<strong>Cách nhận ưu đãi:</strong>
				</p>
				<ul className="list-disc pl-5 space-y-2">
					<li>
						Truy cập{" "}
						<a href="https://vexere.com" className="text-blue-600 underline">
							https://vexere.com
						</a>{" "}
						hoặc ứng dụng VeXeRe trong khung giờ flash sale.
					</li>
					<li>Chọn tuyến xe và thời gian phù hợp.</li>
					<li>
						Nhập mã giảm giá <strong>{promoCode}</strong> khi thanh toán.
					</li>
					<li>Hoặc chọn các chuyến xe có nhãn “Flash Sale 50%”.</li>
				</ul>

				<p className="font-semibold text-red-600">🎁 Ưu đãi có giới hạn số lượng và chỉ áp dụng trong thời gian flash sale!</p>

				<p>Chuẩn bị sẵn sàng và canh giờ để săn ưu đãi cực hời cùng VeXeRe nhé!</p>
			</div>
		</div>
	);
};

export default Endow2;
