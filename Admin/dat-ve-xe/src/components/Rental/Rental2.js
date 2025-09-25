import React from "react";

const Rental2 = () => {
	const vehicleImages = [
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2023/05/Xe-so_Yamaha-Sirius_phanh-dia_do.jpg", // Sirius
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2023/11/Xe-tay-ga_Honda-AirBlade-125cc-2022.png", // Airblade 125
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2023/12/Xe-tay-ga_Honda-AirBlade-150_do.jpg", // Airblade 150
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2024/04/Xe-so_yamaha-pg-1-vang-den.jpg", // PG-1
		"https://vexere.com/vn/thue-xe/wp-content/uploads/2024/06/Xe-con-tay_Honda-Winner-X-2022-trang.png", // Winner X
	];

	return (
		<div className="px-4 py-8 max-w-5xl mx-auto text-justify text-black">
			<h1 className="text-2xl font-bold mb-4">Thuê xe máy Đà Lạt: Bảng giá 2025, Giao xe tận nơi</h1>

			<p className="mb-4">
				Giá thuê xe máy ở Đà Lạt dao động từ <strong>90.000 – 180.000 đồng/ngày</strong> tùy loại xe. Vào dịp lễ như 30/4, 2/9, Tết..., giá có thể tăng từ <strong>30–50%</strong>. Mỗi ngày thuê thường tính từ 6h sáng đến 9h tối, tùy vào gói thuê. Bạn nên đọc kỹ chính sách từng đơn vị để tối ưu chi phí.
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Một số lưu ý khi thuê xe máy ở Đà Lạt</h2>
			<ol className="list-decimal pl-5 mb-6 space-y-2">
				<li>
					<strong>Kiểm tra dự báo thời tiết:</strong> Tránh mưa phùn, sương mù gây trơn trượt. Hạn chế lái xe nếu không quen tầm nhìn thấp.
				</li>
				<li>
					<strong>Chọn loại xe phù hợp:</strong> Địa hình dốc nên chọn xe mạnh như Airblade, Vario hoặc xe số gọn nhẹ.
				</li>
				<li>
					<strong>Đặt xe trước:</strong> Cuối tuần và lễ thường hết xe. Nên đặt trước 2–3 ngày.
				</li>
				<li>
					<strong>Trao đổi thông tin rõ ràng:</strong> Giá thuê, chi phí phát sinh, địa điểm giao nhận xe cần xác minh kỹ.
				</li>
				<li>
					<strong>Mang theo giấy tờ:</strong> CCCD, GPLX là bắt buộc. Một số chỗ giữ lại giấy tờ.
				</li>
				<li>
					<strong>Kiểm tra xe trước khi nhận:</strong> Phanh, đèn, còi, khóa... nên được kiểm tra kỹ. Chụp ảnh xe nếu có vết trầy xước.
				</li>
				<li>
					<strong>Lưu thông tin liên hệ nhà xe:</strong> Số điện thoại, tên cửa hàng... để được hỗ trợ khi cần.
				</li>
			</ol>

			<h2 className="text-xl font-semibold mt-6 mb-2">Bảng giá thuê xe máy Đà Lạt 2025</h2>
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
						<td className="border px-2 py-1">Honda Blade, Yamaha Sirius</td>
						<td className="border px-2 py-1">90.000đ</td>
					</tr>
					<tr>
						<td className="border px-2 py-1">Xe tay ga 125cc</td>
						<td className="border px-2 py-1">Honda Airblade, Honda Vision</td>
						<td className="border px-2 py-1">120.000đ</td>
					</tr>
					<tr>
						<td className="border px-2 py-1">Xe tay ga 150cc</td>
						<td className="border px-2 py-1">Airblade 150, Vario</td>
						<td className="border px-2 py-1">150.000đ</td>
					</tr>
					<tr>
						<td className="border px-2 py-1">Xe số 115cc</td>
						<td className="border px-2 py-1">Yamaha PG-1</td>
						<td className="border px-2 py-1">180.000đ</td>
					</tr>
					<tr>
						<td className="border px-2 py-1">Xe côn tay 150cc</td>
						<td className="border px-2 py-1">Honda Winner, Yamaha Exciter</td>
						<td className="border px-2 py-1">140.000đ</td>
					</tr>
				</tbody>
			</table>

			<h2 className="text-xl font-semibold mb-4">Một số dòng xe thuê phổ biến tại Đà Lạt</h2>
			<div className="space-y-8">
				<div>
					<h3 className="font-bold">1. Xe số phổ thông - Yamaha Sirius</h3>
					<p>Giá rẻ, tiết kiệm xăng, dễ điều khiển. Phù hợp cho đường đèo nhỏ, dễ đi.</p>
					<img src={vehicleImages[0]} alt="Yamaha Sirius" className="mt-2 rounded-lg shadow-md w-full object-cover" />
				</div>

				<div>
					<h3 className="font-bold">2. Xe tay ga 125cc - Honda Airblade</h3>
					<p>Thiết kế mạnh mẽ, dễ leo dốc, phù hợp với mọi người.</p>
					<img src={vehicleImages[1]} alt="Honda Airblade 125cc" className="mt-2 rounded-lg shadow-md w-full object-cover" />
				</div>

				<div>
					<h3 className="font-bold">3. Xe tay ga 150cc - Honda Airblade/Vario</h3>
					<p>Động cơ mạnh, xe đời mới, êm ái. Thích hợp đi xa và lên đèo.</p>
					<img src={vehicleImages[2]} alt="Honda Airblade 150" className="mt-2 rounded-lg shadow-md w-full object-cover" />
				</div>

				<div>
					<h3 className="font-bold">4. Xe số Yamaha PG-1</h3>
					<p>Thiết kế thể thao, bám đường tốt, phù hợp thời tiết mưa, đường trơn trượt ở Đà Lạt.</p>
					<img src={vehicleImages[3]} alt="Yamaha PG-1" className="mt-2 rounded-lg shadow-md w-full object-cover" />
				</div>

				<div>
					<h3 className="font-bold">5. Xe côn tay Honda Winner X</h3>
					<p>Dành cho ai thích trải nghiệm lái xe mạnh mẽ, chinh phục đèo dốc Đà Lạt.</p>
					<img src={vehicleImages[4]} alt="Honda Winner X" className="mt-2 rounded-lg shadow-md w-full object-cover" />
				</div>
			</div>
		</div>
	);
};

export default Rental2;
