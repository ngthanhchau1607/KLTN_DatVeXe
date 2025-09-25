import React from "react";

const Rental3 = () => {
	const vehicleImages = [
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2023/05/Xe-so_Yamaha-Sirius_phanh-dia_do.jpg", // Xe số Yamaha Sirius
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2023/11/Xe-tay-ga_Honda-AirBlade-125cc-2022.png", // Xe tay ga AirBlade 125
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2023/12/xe-anh-danh-vexere-3-e1702984033492.jpg", // Minh họa thuê xe tại Nha Trang
	];

	return (
		<div className="px-4 py-8 max-w-5xl mx-auto text-justify text-black">
			<h1 className="text-2xl font-bold mb-4">Thuê xe máy Nha Trang: Không cần bằng lái, Giao xe tận nơi</h1>

			<h2 className="text-xl font-semibold mb-2">Thuê xe máy ở Nha Trang không cần bằng lái</h2>
			<p className="mb-4">
				Theo Luật trật tự, an toàn giao thông đường bộ 2024, bạn vẫn có thể điều khiển xe máy hợp pháp nếu chọn dòng xe có dung tích <strong>dưới 50cc</strong> hoặc xe máy điện công suất <strong>dưới 4kW</strong>. Tại Nha Trang, <strong>Yamaha Mio Classico 50cc</strong> là lựa chọn lý tưởng cho bạn trẻ từ 16 tuổi, với thiết kế nhỏ gọn, trọng lượng nhẹ, dễ điều khiển – rất phù hợp để di chuyển trong phố.
			</p>

			<h2 className="text-xl font-semibold mb-2">Giá thuê xe máy ở Nha Trang</h2>
			<p className="mb-4">
				Mức giá thuê xe máy tại Nha Trang dao động từ <strong>100.000 – 200.000đ/ngày</strong> tùy dòng xe và thời điểm. Vào dịp lễ như 30/4, 2/9, Tết Dương Lịch,… giá có thể tăng nhẹ khoảng 20%. Thời gian thuê phổ biến là <strong>24 tiếng</strong>. Nếu thuê thêm dưới 4 giờ, chỉ cần trả thêm nửa ngày tiền thuê.
			</p>

			<h3 className="font-semibold mt-4">Giá thuê xe số</h3>
			<p>
				Xe số được ưa chuộng nhờ sự linh hoạt và tiết kiệm nhiên liệu. Các dòng xe như <strong>Honda Wave Alpha, Blade, Yamaha Sirius</strong> được thuê nhiều tại Nha Trang với mức giá từ <strong>100.000 – 120.000đ/ngày</strong>.
			</p>
			<img src={vehicleImages[0]} alt="Xe số Yamaha Sirius" className="mt-2 rounded-lg shadow-md w-full object-cover mb-6" />

			<h3 className="font-semibold mt-4">Giá thuê xe tay ga</h3>
			<p>
				Xe tay ga như <strong>Honda Airblade, Vision, Yamaha Janus</strong> là lựa chọn phổ biến cho du khách vì sự thoải mái khi di chuyển trong thành phố. Giá thuê trung bình khoảng <strong>150.000đ/ngày</strong>.
			</p>
			<img src={vehicleImages[1]} alt="Xe tay ga Honda AirBlade" className="mt-2 rounded-lg shadow-md w-full object-cover mb-6" />

			<h3 className="font-semibold mt-4">Giá thuê xe máy theo giờ</h3>
			<p className="mb-4">Một số cửa hàng hỗ trợ gói thuê theo giờ hoặc nửa ngày – thường áp dụng vào mùa thấp điểm. Bạn nên liên hệ trực tiếp để được tư vấn chính xác và phù hợp.</p>

			<h2 className="text-xl font-semibold mb-4">Bảng giá thuê xe máy giao tận nơi tại Nha Trang</h2>
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
						<td className="border px-2 py-1">Xe tay ga 125cc</td>
						<td className="border px-2 py-1">Airblade, Vision, Janus</td>
						<td className="border px-2 py-1">150.000đ</td>
					</tr>
					<tr>
						<td className="border px-2 py-1">Xe số 110cc</td>
						<td className="border px-2 py-1">Wave RSX, Sirius</td>
						<td className="border px-2 py-1">100.000đ</td>
					</tr>
				</tbody>
			</table>

			<h2 className="text-xl font-semibold mb-2">Thuê xe máy ở đâu tại Nha Trang?</h2>

			<h3 className="font-semibold mt-4">1. Thuê xe tại khách sạn</h3>
			<p>
				<strong>Ưu điểm:</strong> Tiện, nhanh, không cần hợp đồng phức tạp.
			</p>
			<p className="mb-2">
				<strong>Nhược điểm:</strong> Ít lựa chọn xe, hỗ trợ hạn chế khi có sự cố.
			</p>

			<h3 className="font-semibold mt-4">2. Thuê tại cửa hàng cho thuê xe máy</h3>
			<p>
				<strong>Ưu điểm:</strong> Dịch vụ chuyên nghiệp, xe bảo dưỡng định kỳ, hỗ trợ nhanh chóng, đa dạng xe.
			</p>
			<p className="mb-2">
				<strong>Nhược điểm:</strong> Quy trình thuê có thể yêu cầu cọc và giấy tờ, tốn thời gian tìm kiếm nếu không đặt trước.
			</p>

			<h3 className="font-semibold mt-4">3. Thuê xe qua website/app Vexere</h3>
			<ul className="list-disc pl-5 mb-4">
				<li>Giao xe tận nơi, thủ tục đơn giản</li>
				<li>Đa dạng loại xe – giá minh bạch</li>
				<li>Hỗ trợ nhanh chóng qua Zalo, tổng đài</li>
				<li>Ưu đãi “thuê lâu – giá rẻ”</li>
			</ul>
			<img src={vehicleImages[2]} alt="Thuê xe máy Vexere Nha Trang" className="mt-2 rounded-lg shadow-md w-full object-cover mb-6" />

			<h2 className="text-xl font-semibold mt-6 mb-2">Hướng dẫn thuê xe tại Nha Trang qua Vexere</h2>
			<ol className="list-decimal pl-5 mb-6">
				<li>Nhập thông tin thuê xe: loại xe, số lượng, thời gian – địa điểm nhận/trả xe</li>
				<li>Nhận xác nhận qua SMS, Zalo hoặc Email</li>
				<li>Đến địa điểm hẹn, nhận xe và bắt đầu trải nghiệm</li>
			</ol>

			<h2 className="text-xl font-semibold mb-2">Tổng kết</h2>
			<p>Thuê xe máy ở Nha Trang là lựa chọn tiện lợi, tiết kiệm và linh hoạt giúp bạn khám phá thành phố biển xinh đẹp này theo cách riêng của mình. Dù bạn có bằng lái hay chưa, hãy lựa chọn dòng xe phù hợp để đảm bảo an toàn và có hành trình thật đáng nhớ!</p>
		</div>
	);
};

export default Rental3;
