import React from "react";

const Feature4 = () => {
	return (
		<div className="max-w-3xl mx-auto px-4 py-8 text-black">
			{/* Tiêu đề */}
			<h1 className="text-2xl md:text-3xl font-bold mb-4">Cách chọn điểm đón xe gần bạn nhất</h1>

			{/* Ảnh bìa */}
			<div className="mb-6">
				<img src="https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/301/img_hero.png?v=4" alt="Chọn điểm đón xe gần nhất" className="w-full rounded-lg" />
			</div>

			{/* Nội dung */}
			<p className="mb-4">
				Bạn đang lên kế hoạch đặt vé xe khách và cần tìm kiếm một hãng xe có vị trí điểm đón thuận tiện nhất với lịch trình của mình? Cùng Vexere xem ngay tính năng <strong>Chọn điểm đón gần nhất</strong> để tìm được nhà xe có hỗ trợ đón khách tại các điểm thuận tiện nhất dành cho bạn nhé!
			</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Lợi ích khi sử dụng tính năng Chọn điểm đón trả gần nhất</h2>
			<p className="mb-4">Bên cạnh các trạm và văn phòng nhà xe, một số hãng xe sẽ có hỗ trợ đón khách tại nhiều địa điểm dọc đường xe chạy. Bạn có thể lựa chọn những điểm đón gần bạn để lên xe mà không cần phải di chuyển ra bến xe/văn phòng của nhà xe.</p>
			<p className="mb-4">Sử dụng tính năng này khi đặt xe tại Vexere sẽ giúp bạn rút ngắn được thời gian di chuyển, hạn chế được các sự cố như tắc đường dẫn đến việc bị trễ chuyến xe.</p>

			<h2 className="text-xl font-semibold mt-6 mb-2">Cách sử dụng tính năng tìm điểm đón/trả gần nhất</h2>

			<ul className="list-decimal list-inside space-y-4 mb-4">
				<li>
					<strong>Truy cập</strong>{" "}
					<a href="https://vexere.com" className="text-blue-600 underline">
						https://vexere.com
					</a>{" "}
					hoặc ứng dụng Vexere. Chọn Điểm đi, Điểm đến, Ngày khởi hành và chọn nhà xe yêu thích của bạn.
				</li>
				<li>
					<strong>Chọn vị trí ghế ngồi</strong> hoặc giường nằm mong muốn.
				</li>
				<li>
					Tại trang <strong>Chọn điểm đón</strong>, bạn click vào tab <strong>Gần nhất</strong>, hệ thống sẽ hiển thị các điểm đón gần bạn và khoảng cách từ vị trí của bạn đến các điểm đón này.
					<br />
					<em>Ví dụ: Khoảng cách từ vị trí hiện tại của tôi đến điểm đón Lăng Cha Cả là 2.2km.</em>
					<br />
					Bạn có thể nhấn nút <strong>Thay đổi</strong> để nhập địa chỉ của mình, hoặc chọn <strong>Dùng vị trí hiện tại</strong> để tìm chính xác những điểm đón gần bạn nhất.
				</li>
				<li>
					Sau khi chọn điểm đón gần nhất, bạn tiếp tục chọn <strong>điểm trả khách</strong>, nhập <strong>thông tin hành khách</strong>, tiến hành <strong>thanh toán</strong> và chờ lên xe.
				</li>
			</ul>

			<p className="mt-6">Nhờ vào tính năng thông minh này, Vexere giúp bạn tiết kiệm thời gian, công sức và đảm bảo trải nghiệm đặt vé trở nên dễ dàng, thuận tiện hơn bao giờ hết!</p>
		</div>
	);
};

export default Feature4;
