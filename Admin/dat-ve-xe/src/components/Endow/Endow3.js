import React from "react";

const Endow3 = () => {
	// Dữ liệu nhà xe với thời gian ưu đãi và mã giảm giá
	const busData = [
		{
			name: "Nhà xe An Bình",
			period: "23/09 - 23/11",
			code: "ANB123",
		},
		{
			name: "Nhà xe Thanh Hưng",
			period: "01/10 - 30/11",
			code: "THU456",
		},
		{
			name: "Nhà xe Minh Thành",
			period: "15/09 - 15/11",
			code: "MTH789",
		},
		{
			name: "Nhà xe Hoàng Long",
			period: "20/09 - 20/11",
			code: "HLG321",
		},
		{
			name: "Nhà xe Sài Gòn Express",
			period: "10/10 - 10/12",
			code: "SGE654",
		},
	];

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			{/* Tiêu đề */}
			<h1 className="text-2xl md:text-3xl font-bold text-center text-purple-700 mb-6">Giảm đến 20% khi đặt vé các nhà xe mới mở</h1>

			{/* Ảnh bìa */}
			<img src="http://localhost:3000/images/ud/ud1.png" alt="Giảm đến 20% cho nhà xe mới mở" className="w-full h-auto rounded-md shadow-md mb-6" />

			{/* Mô tả ưu đãi */}
			<div className="text-base md:text-lg leading-relaxed text-gray-800 space-y-4 mb-8">
				<p>
					VeXeRe hỗ trợ ưu đãi đặc biệt dành cho các nhà xe mới mở tuyến hoặc mới gia nhập hệ thống với mức giảm giá lên đến <strong>20%</strong>.
				</p>

				<p>Chương trình nhằm khuyến khích khách hàng trải nghiệm các dịch vụ mới, giúp bạn có nhiều lựa chọn hơn với mức giá tiết kiệm.</p>

				<p>
					<strong>Cách sử dụng ưu đãi:</strong>
				</p>
				<ul className="list-disc pl-5 space-y-2">
					<li>Truy cập website hoặc ứng dụng VeXeRe.</li>
					<li>Chọn điểm đi, điểm đến và ngày khởi hành.</li>
					<li>Tìm kiếm các nhà xe mới mở bằng bộ lọc hoặc nhãn “Nhà xe mới”.</li>
					<li>Ưu đãi giảm giá sẽ tự động áp dụng khi đặt vé của các nhà xe này.</li>
				</ul>

				<p className="font-semibold text-purple-600">🎁 Ưu đãi có giới hạn tùy theo từng nhà xe và tuyến đường, đừng bỏ lỡ cơ hội trải nghiệm dịch vụ mới với mức giá hấp dẫn!</p>

				<p>Hãy cập nhật thường xuyên để không bỏ lỡ các nhà xe mới mở và những ưu đãi đặc biệt từ VeXeRe nhé!</p>
			</div>

			{/* Bảng thông tin nhà xe + mã giảm giá */}
			<h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">Danh sách nhà xe mới & ưu đãi</h2>
			<table className="w-full table-auto border-collapse border border-gray-300 rounded-md shadow-md">
				<thead className="bg-purple-100">
					<tr>
						<th className="border border-gray-300 px-4 py-2 text-left">Nhà xe</th>
						<th className="border border-gray-300 px-4 py-2 text-center">Thời gian ưu đãi</th>
						<th className="border border-gray-300 px-4 py-2 text-center">Mã giảm giá</th>
					</tr>
				</thead>
				<tbody>
					{busData.map((bus, index) => (
						<tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-purple-50"}>
							<td className="border border-gray-300 px-4 py-2">{bus.name}</td>
							<td className="border border-gray-300 px-4 py-2 text-center">{bus.period}</td>
							<td className="border border-gray-300 px-4 py-2 text-center font-mono font-semibold text-purple-700">{bus.code}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Endow3;
