import React, {useEffect, useState} from "react";

const Endow1 = () => {
	const [countdown, setCountdown] = useState("");
	const [isPromoDay, setIsPromoDay] = useState(false);
	const promoCode = "VXR250"; // 6 ký tự

	useEffect(() => {
		const calculateCountdown = () => {
			const now = new Date();
			const currentYear = now.getFullYear();
			const currentMonth = now.getMonth();

			const promoStart = new Date(currentYear, currentMonth, 25, 0, 0, 0);
			const promoEnd = new Date(currentYear, currentMonth, 25, 23, 59, 59);

			if (now >= promoStart && now <= promoEnd) {
				setIsPromoDay(true);
				setCountdown("Ưu đãi đang diễn ra!");
				return;
			} else {
				setIsPromoDay(false);
			}

			// Nếu đã qua 25 thì đếm tới 25 tháng sau
			let target = promoStart;
			if (now > promoEnd) {
				target = new Date(currentYear, currentMonth + 1, 25, 0, 0, 0);
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
			<h1 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">Lương về chốt deal - Giảm đến 50% ngày 25 hằng tháng</h1>

			<img src="http://localhost:3000/images/ud/ud4.jpeg" alt="Lương về chốt deal" className="w-full h-auto rounded-md shadow-md mb-6" />

			{/* Đếm ngược và mã khuyến mãi */}
			<div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 px-4 py-4 mb-6 rounded-md">
				<p className="font-semibold mb-2">⏳ Đếm ngược đến ngày ưu đãi 25 hàng tháng:</p>
				<p className="text-lg font-bold">{countdown}</p>

				{/* Mã giảm giá luôn hiển thị */}
				<div className="mt-4 p-4 bg-white border border-dashed border-green-600 rounded-md text-center">
					<p className="text-green-700 font-semibold text-lg mb-1">🎉 Mã giảm giá:</p>
					<p className="text-2xl font-bold text-green-800 tracking-widest">{promoCode}</p>
					<p className="text-sm text-gray-600 mt-2">Giảm 50% tối đa 50.000đ</p>
				</div>
			</div>

			{/* Nội dung chính */}
			<div className="text-base md:text-lg leading-relaxed text-gray-800 space-y-4">
				<p>
					Mỗi tháng vào ngày 25 — thời điểm “lương về”, VeXeRe tung ra chương trình ưu đãi cực sốc với mức giảm giá lên đến <strong>50%</strong> dành cho hàng loạt hãng xe liên kết.
				</p>

				<p>Chương trình chỉ diễn ra duy nhất trong ngày 25 hằng tháng. Đây là cơ hội để bạn tiết kiệm chi phí cho những chuyến đi du lịch, công tác, hoặc về quê.</p>

				<p>
					<strong>Cách nhận ưu đãi:</strong>
				</p>
				<ul className="list-disc pl-5 space-y-2">
					<li>
						Truy cập vào{" "}
						<a href="https://vexere.com" className="text-blue-600 underline">
							https://vexere.com
						</a>{" "}
						hoặc mở ứng dụng VeXeRe.
					</li>
					<li>Chọn tuyến xe, ngày đi phù hợp.</li>
					<li>Nhập mã giảm giá hoặc chọn các hãng xe có gắn nhãn “Ưu đãi 50%”.</li>
					<li>Tiến hành đặt vé và thanh toán để nhận ưu đãi.</li>
				</ul>

				<p className="font-semibold text-green-600">🎁 Ưu đãi số lượng có hạn. Áp dụng cho một số nhà xe và tuyến đường nhất định!</p>

				<p>Nhanh tay đặt vé vào ngày 25 hằng tháng để không bỏ lỡ cơ hội tiết kiệm siêu khủng từ VexeRe bạn nhé!</p>
			</div>
		</div>
	);
};

export default Endow1;
