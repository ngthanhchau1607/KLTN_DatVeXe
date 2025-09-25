import React from "react";

const Rental1 = () => {
	const placeImages = [
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2025/04/Screenshot-2025-05-19-at-12.23.26.png", // Thác Đamb’ri
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2025/04/Screenshot-2025-05-19-at-12.24.24.png", // Linh Quy Pháp Ấn
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2025/04/Screenshot-2025-05-19-at-12.26.32.png", // Chùa Di Đà
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2025/04/Screenshot-2025-05-19-at-12.29.25.png", // Thánh Đường Giáo Xứ Thánh Mẫu
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2025/04/Screenshot-2025-05-19-at-12.30.49.png", // Núi Đại Bình
	];

	return (
		<div className="px-4 py-8 max-w-5xl mx-auto text-justify text-black">
			<h1 className="text-2xl font-bold mb-4">Thuê xe máy Bảo Lộc: Bảng giá 2025, Giao xe tận nơi</h1>

			<p className="mb-4">
				Giá thuê xe máy tại Bảo Lộc trung bình <strong>130.000 đồng/ngày</strong>. Vào các dịp lễ như 30/4, 2/9, Tết Dương lịch, Tết Âm lịch, giá có thể tăng khoảng <strong>20-30%</strong> do nhu cầu cao. Thời gian thuê xe thường được tính từ sáng đến tối trong ngày nhận xe, tuy nhiên, một số cửa hàng có thể áp dụng cách tính khác nhau. Để tránh phát sinh chi phí ngoài ý muốn, bạn nên hỏi rõ quy định thuê trước khi đặt xe.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Bảng giá thuê xe máy Bảo Lộc 2025</h2>
			<table className="w-full text-sm mb-6 border border-gray-300">
				<thead className="bg-gray-200">
					<tr>
						<th className="border px-2 py-1">Loại xe</th>
						<th className="border px-2 py-1">Dòng xe</th>
						<th className="border px-2 py-1">Giá/ngày</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border px-2 py-1">Xe số 110cc</td>
						<td className="border px-2 py-1">Yamaha Sirius, Yamaha Jupiter</td>
						<td className="border px-2 py-1">130.000đ</td>
					</tr>
					<tr>
						<td className="border px-2 py-1">Xe tay ga 125cc</td>
						<td className="border px-2 py-1">Honda Vision, Honda AirBlade</td>
						<td className="border px-2 py-1">150.000đ</td>
					</tr>
				</tbody>
			</table>

			<h2 className="text-xl font-semibold mb-2">Nên thuê xe máy Bảo Lộc ở đâu?</h2>

			<h3 className="font-semibold mt-4">1. Thuê xe tại khách sạn, homestay</h3>
			<p>
				<strong>Ưu điểm:</strong> Tiện lợi, nhận xe ngay tại nơi lưu trú, tiết kiệm thời gian.
			</p>
			<p className="mb-2">
				<strong>Nhược điểm:</strong> Số lượng xe ít, chất lượng không đồng đều, ít hỗ trợ khi gặp sự cố.
			</p>

			<h3 className="font-semibold mt-4">2. Thuê qua Website hoặc Ứng dụng Xenhanh</h3>
			<ul className="list-disc pl-5 mb-4">
				<li>Đa dạng dòng xe và gói dịch vụ</li>
				<li>Giá và chính sách rõ ràng</li>
				<li>Giao nhận xe tận nơi linh hoạt</li>
				<li>Hỗ trợ khách hàng tận tình qua Hotline hoặc Zalo</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">Các bước đặt dịch vụ thuê xe máy tại Xenhanh</h2>
			<ol className="list-decimal pl-5 mb-6">
				<li>Chọn loại xe, gói thuê phù hợp và nhập thông tin lịch trình</li>
				<li>Nhận xác nhận thuê xe qua SMS, Zalo hoặc Email</li>
				<li>Nhận xe tại điểm hẹn, cung cấp thông tin xác nhận và bắt đầu chuyến đi</li>
			</ol>

			<h2 className="text-xl font-semibold mt-6 mb-4">Các điểm check-in nổi bật tại Bảo Lộc</h2>

			<div className="space-y-8">
				<div>
					<h3 className="font-bold">1. Thác Đamb’ri</h3>
					<p>Thác nước cao và hùng vĩ nhất tỉnh Lâm Đồng, cách trung tâm 18 km. Khu du lịch kết hợp tham quan, vui chơi và ăn uống lý tưởng cho gia đình.</p>
					<img src={placeImages[0]} alt="Thác Đamb’ri" className="mt-2 rounded-lg shadow-md w-full object-cover" />
				</div>

				<div>
					<h3 className="font-bold">2. Linh Quy Pháp Ấn</h3>
					<p>Chốn "bồng lai tiên cảnh", nổi tiếng qua MV Lạc Trôi của Sơn Tùng MTP. View bình minh và hoàng hôn cực kỳ ấn tượng.</p>
					<img src={placeImages[1]} alt="Linh Quy Pháp Ấn" className="mt-2 rounded-lg shadow-md w-full object-cover" />
				</div>

				<div>
					<h3 className="font-bold">3. Chùa Di Đà</h3>
					<p>Kiến trúc Phật giáo kết hợp phong cách Châu Mạ và Tây Nguyên. Bao quanh là đồi chè xanh và hàng cau thẳng tắp.</p>
					<img src={placeImages[2]} alt="Chùa Di Đà" className="mt-2 rounded-lg shadow-md w-full object-cover" />
				</div>

				<div>
					<h3 className="font-bold">4. Thánh Đường Giáo Xứ Thánh Mẫu</h3>
					<p>Kiến trúc đá tổ ong độc đáo. Không khí trong lành và kiến trúc nghệ thuật khiến nơi đây thu hút đông khách tham quan.</p>
					<img src={placeImages[3]} alt="Thánh Đường Giáo Xứ Thánh Mẫu" className="mt-2 rounded-lg shadow-md w-full object-cover" />
				</div>

				<div>
					<h3 className="font-bold">5. Núi Đại Bình</h3>
					<p>View “chill” cực đẹp, khí hậu mát mẻ, lý tưởng từ tháng 10 đến tháng 4. Địa điểm sống ảo với mây trời và cây cối xanh tươi.</p>
					<img src={placeImages[4]} alt="Núi Đại Bình" className="mt-2 rounded-lg shadow-md w-full object-cover" />
				</div>
			</div>
		</div>
	);
};

export default Rental1;
