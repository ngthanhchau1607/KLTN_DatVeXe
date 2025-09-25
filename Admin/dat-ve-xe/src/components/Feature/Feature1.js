import React from "react";

const Feature1 = () => {
	return (
		<div className="max-w-3xl mx-auto px-4 py-8 text-black">
			<h1 className="text-2xl md:text-3xl font-bold mb-4">Cách sử dụng tính năng GPS xem vị trí xe khách</h1>
			{/* Ảnh bìa */}
			<div className="mb-6">
				<img src="https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/289/img_hero.png?v=10" alt="Cách sử dụng GPS xem vị trí xe khách" className="w-full rounded-lg" />
			</div>
			<p className="mb-4">
				<strong>GPS</strong> là tính năng nổi bật trên Vexere, cho phép bạn biết chính xác lộ trình, biển số, số điện thoại tài xế và hành trình xe đã đặt. Bạn có thể chủ động thời gian đến điểm đón nhờ theo dõi vị trí xe theo thời gian thực trên bản đồ. Thông tin tài xế và biển số xe cũng hiển thị rõ ràng, giúp dễ dàng tìm đúng xe và liên hệ khi cần thiết.
			</p>

			<p className="mb-4 italic text-sm text-gray-700">*Thông tin lộ trình, biển số xe, số điện thoại tài xế và vị trí xe sẽ được cập nhật chính xác và đầy đủ nhất vào thời điểm cách 1 tiếng so với giờ đón khách được hiển thị trên thông tin đơn hàng.</p>

			<p className="mb-4">
				Bạn nhớ <strong>Cho phép nhận thông báo từ ứng dụng Vexere</strong> và <strong>Bật chia sẻ vị trí</strong> trên điện thoại để trải nghiệm tính năng này tốt nhất nhé!
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Cho phép nhận thông báo từ ứng dụng Vexere</h2>
			<ul className="list-disc list-inside mb-4">
				<li>Với hệ điều hành iOS: (hiển thị giao diện minh họa nếu có)</li>
				<li>Với hệ điều hành Android: (hiển thị giao diện minh họa nếu có)</li>
			</ul>

			<h2 className="text-xl font-semibold mt-6 mb-2">Các cách sử dụng tính năng GPS xem vị trí xe trên ứng dụng Vexere</h2>

			<h3 className="text-lg font-semibold mt-4">Cách 1: Xem qua thông báo từ ứng dụng Vexere</h3>
			<p className="mb-4">Sau khi đặt đơn hàng và thanh toán thành công. Trước giờ xe đón khoảng 1 tiếng, Vexere sẽ gửi thông báo về điện thoại của bạn. Khi bấm vào thông báo, ứng dụng sẽ hiển thị vị trí của chuyến xe mà bạn đã đặt chỗ thành công.</p>

			<h3 className="text-lg font-semibold mt-4">Cách 2: Xem tại phần thông tin đơn hàng</h3>
			<p className="mb-4">
				Vào ứng dụng Vexere, chọn vào mục <strong>Vé của tôi</strong>, sau đó chọn <strong>Vé hiện tại</strong>. Ở ô thông tin đơn hàng, bạn chọn vào nút <strong>Xem vị trí xe</strong>. Ứng dụng sẽ tự động hiển thị vị trí của chuyến xe mà bạn đã đặt dịch vụ.
			</p>
			<p className="mb-4 italic text-sm text-gray-700">*Nút "Xem vị trí xe" sẽ chỉ hiển thị khi nhà xe đó có hỗ trợ tính năng GPS xem vị trí xe.</p>

			<h3 className="text-lg font-semibold mt-4">Cách 3: Xem tại email Xác nhận thông tin đơn hàng/email Thay đổi thông tin chuyến đi</h3>
			<p className="mb-4">
				Bạn mở email <strong>Xác nhận thông tin đơn hàng</strong> hoặc email <strong>Thay đổi thông tin chuyến đi</strong>. Chọn tiếp vào nút <strong>Xem vị trí xe</strong>.
			</p>
			<ul className="list-disc list-inside mb-4 text-sm text-gray-700 italic">
				<li>Thông tin vị trí xe sẽ được cập nhật cùng lúc với biển số xe.</li>
				<li>Nút "Xem vị trí xe" sẽ chỉ hiển thị khi nhà xe đó có hỗ trợ tính năng GPS xem vị trí xe.</li>
			</ul>
		</div>
	);
};

export default Feature1;
