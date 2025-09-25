import React from "react";

const Endow4 = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			{/* Tiêu đề */}
			<h1 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-6">Giới thiệu bạn mới - Nhận quà khủng</h1>

			{/* Ảnh bìa */}
			<img src="http://localhost:3000/images/ud/ud2.jpeg" alt="Giới thiệu bạn mới - Nhận quà khủng" className="w-full h-auto rounded-md shadow-md mb-6" />

			{/* Mô tả chương trình */}
			<div className="text-base md:text-lg leading-relaxed text-gray-800 space-y-4 mb-8">
				<p>
					Bạn muốn nhận thêm nhiều quà tặng giá trị? Hãy giới thiệu ngay bạn bè cùng sử dụng VeXeRe và nhận quà khủng từ chương trình <strong>“Giới thiệu bạn mới”</strong>.
				</p>

				<p>Khi bạn bè của bạn đăng ký và đặt vé thành công qua link giới thiệu, cả hai sẽ nhận được nhiều phần thưởng hấp dẫn.</p>

				<h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-3">Cách thức tham gia:</h2>
				<ol className="list-decimal pl-5 space-y-2">
					<li>Đăng nhập vào tài khoản VeXeRe của bạn.</li>
					<li>Truy cập trang “Giới thiệu bạn mới” để lấy link hoặc mã giới thiệu.</li>
					<li>Chia sẻ link/mã với bạn bè qua tin nhắn, email hoặc mạng xã hội.</li>
					<li>Bạn bè đăng ký tài khoản mới trên VeXeRe bằng link hoặc mã của bạn và đặt vé thành công.</li>
					<li>Sau khi đặt vé thành công, cả bạn và bạn bè sẽ nhận được quà tặng từ VeXeRe.</li>
				</ol>

				<h2 className="text-xl font-semibold text-indigo-600 mt-6 mb-3">Phần quà hấp dẫn:</h2>
				<ul className="list-disc pl-5 space-y-2">
					<li>Mỗi lượt giới thiệu thành công nhận ngay mã giảm giá 30.000đ.</li>
					<li>Tích lũy đủ 5 lượt giới thiệu thành công sẽ nhận quà đặc biệt giá trị.</li>
					<li>Cơ hội tham gia các chương trình bốc thăm trúng thưởng với nhiều phần quà hấp dẫn như vé xe miễn phí, voucher ăn uống, quà tặng lưu niệm...</li>
				</ul>

				<p className="font-semibold text-indigo-700">🎁 Càng giới thiệu nhiều, quà càng lớn - Đừng bỏ lỡ cơ hội nhận ưu đãi “khủng” từ VeXeRe!</p>
			</div>
		</div>
	);
};

export default Endow4;
