import React from "react";

const Feature3 = () => {
	return (
		<div className="max-w-3xl mx-auto px-4 py-8 text-black">
			{/* Tiêu đề chính */}
			<h1 className="text-2xl md:text-3xl font-bold mb-4">Tìm xe theo nhu cầu dựa trên các tiêu chí phổ biến</h1>

			{/* Ảnh bìa */}
			<div className="mb-6">
				<img src="https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/302/img_hero.png?v=5" alt="Tìm xe theo nhu cầu" className="w-full rounded-lg" />
			</div>

			{/* Nội dung */}
			<p className="mb-4">
				Có rất nhiều tiêu chí để giúp bạn chọn lựa hãng xe khách phù hợp nhất với nhu cầu di chuyển của mình. Tại Vexere, bạn có thể sử dụng tính năng <strong>Lọc</strong> và <strong>Sắp xếp</strong> để lựa chọn xe dựa trên một vài tiêu chí phổ biến. Cùng Vexere tìm hiểu cách sử dụng các tính năng này ngay sau đây nhé!
			</p>

			{/* Tính năng Lọc */}
			<h2 className="text-xl font-semibold mt-6 mb-2">Tính năng “Lọc”</h2>
			<p className="mb-4">
				Bạn truy cập website{" "}
				<a href="https://vexere.com" className="text-blue-600 underline">
					https://vexere.com
				</a>{" "}
				hoặc ứng dụng Vexere. Chọn Điểm đi, Điểm đến, Ngày khởi hành và tiến hành Tìm chuyến. Tại trang tìm chuyến, bạn chọn vào tính năng <strong>Lọc</strong>.
			</p>
			<p className="mb-4">Tại đây, bạn có thể tìm xe nhanh theo nhu cầu dựa trên các tiêu chí như: giờ đi, tên nhà xe, giá vé, điểm đón/trả, loại xe, đánh giá, loại giường/ghế và vị trí chỗ ngồi.</p>

			<ul className="list-disc list-inside space-y-4 mb-4">
				<li>
					<strong>Tìm xe theo Giờ đi:</strong> Kéo thanh hoặc nhập giờ tại ô "Từ...Đến..." để chọn khoảng giờ mong muốn rồi nhấn <strong>Xem chuyến</strong>.
				</li>
				<li>
					<strong>Tìm xe theo Tên nhà xe:</strong> Chọn mục "Nhà xe", tìm và tick chọn tên hãng bạn mong muốn. Sau đó nhấn <strong>Lưu</strong>.
				</li>
				<li>
					<strong>Tìm xe theo Điểm đón:</strong> Chọn mục "Điểm đón", tick điểm mong muốn và chọn <strong>Lưu</strong>.
				</li>
				<li>
					<strong>Tìm xe theo Điểm trả:</strong> Làm tương tự như điểm đón.
				</li>
				<li>
					<strong>Tìm xe theo Loại xe:</strong> Chọn loại xe phù hợp (ghế ngồi, giường nằm, limousine, v.v.)
				</li>
				<li>
					<strong>Tìm xe theo Giá vé:</strong> Kéo thanh để chọn khoảng giá phù hợp rồi nhấn <strong>Xem chuyến</strong>.
				</li>
				<li>
					<strong>Tìm xe theo Tiêu chí phổ biến:</strong> Bao gồm:
					<ul className="list-disc ml-6 mt-1 space-y-1">
						<li>Xác nhận đặt chỗ ngay lập tức</li>
						<li>Không cần thanh toán trước</li>
						<li>Chuyến có trung chuyển đón/trả</li>
						<li>Chuyến có giảm giá & khuyến mãi</li>
						<li>Xe limousine chất lượng cao</li>
						<li>Chuyến được chọn trước chỗ ngồi</li>
						<li>Cho xem vị trí xe</li>
					</ul>
					Tick chọn các tiêu chí và chọn <strong>Xem chuyến</strong>.
				</li>
				<li>
					<strong>Tìm xe theo Đánh giá:</strong> Kéo thanh để chọn mức đánh giá (ví dụ từ 4 đến 5 sao).
				</li>
				<li>
					<strong>Tìm xe theo Loại ghế/giường:</strong> Tick chọn loại chỗ ngồi mong muốn.
				</li>
				<li>
					<strong>Tìm xe theo Vị trí ghế/giường:</strong> Chọn các ô Hàng ghế đầu / giữa / cuối hoặc <strong>Số ghế trống</strong> phù hợp với số lượng hành khách.
				</li>
			</ul>

			{/* Tính năng Sắp xếp */}
			<h2 className="text-xl font-semibold mt-6 mb-2">Tính năng “Sắp xếp”</h2>
			<p className="mb-4">
				Trên website hoặc ứng dụng Vexere, sau khi tìm chuyến, bạn có thể chọn tính năng <strong>Sắp xếp</strong> để hiển thị các hãng xe theo thứ tự mong muốn.
			</p>
			<p className="mb-4">Các tiêu chí sắp xếp bao gồm:</p>
			<ul className="list-disc list-inside space-y-2 mb-4">
				<li>Giờ đi sớm nhất</li>
				<li>Giờ đi muộn nhất</li>
				<li>Đánh giá cao nhất</li>
				<li>Giá tăng dần</li>
				<li>Giá giảm dần</li>
			</ul>

			<p className="mt-6">
				Việc sử dụng tính năng <strong>Lọc</strong> và <strong>Sắp xếp</strong> giúp bạn nhanh chóng chọn được chuyến xe ưng ý nhất, tiết kiệm thời gian và đảm bảo phù hợp với nhu cầu của bạn. Hãy thử ngay trên Vexere nhé!
			</p>
		</div>
	);
};

export default Feature3;
