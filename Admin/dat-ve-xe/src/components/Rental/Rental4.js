import React from "react";

const Rental4 = () => {
	const travelImages = {
		baiTruoc: "https://vexere.com/vn/thue-xe/wp-content/uploads/2025/07/bai-truoc-vung-tau.jpg",
		baiSau: "https://vexere.com/vn/thue-xe/wp-content/uploads/2024/01/Vung-tau_Bai-Sau1.jpg",
		haiDang: "https://vexere.com/vn/thue-xe/wp-content/uploads/2023/12/hai-dang-vung-tau.png",
		muiNghinhPhong: "https://vexere.com/vn/thue-xe/wp-content/uploads/2023/12/mui-nghinh-phong-vung-tau.png",
		hoDaXanh: "https://vexere.com/vn/thue-xe/wp-content/uploads/2023/12/ho-da-xanh-vung-tau.jpg",
	};

	return (
		<div className="max-w-5xl mx-auto px-4 py-8 text-justify text-black">
			<h1 className="text-2xl font-bold mb-6">Một số lưu ý khi thuê xe máy ở Vũng Tàu</h1>

			<ol className="list-decimal space-y-4 pl-5">
				<li>
					<strong>Lựa chọn loại xe phù hợp:</strong> Chọn xe dựa vào mục đích di chuyển và kinh nghiệm lái xe. Nếu bạn muốn khám phá các địa điểm gập ghềnh, nên chọn xe số hoặc xe côn tay. Nếu chỉ đi dạo trong thành phố, xe tay ga như Honda Vision, Yamaha Nouvo, Airblade là đủ.
				</li>

				<li>
					<strong>Đặt trước dịch vụ thuê xe:</strong> Vào cuối tuần hay dịp cao điểm, xe dễ hết. Bạn nên đặt trước 2–3 ngày để được giao xe đúng giờ, đúng loại mong muốn.
				</li>

				<li>
					<strong>Mang theo giấy tờ cần thiết:</strong> Giấy phép lái xe, CCCD. Một số nhà xe yêu cầu giữ lại giấy tờ khi thuê xe nên cần chuẩn bị kỹ càng.
				</li>

				<li>
					<strong>Trao đổi rõ ràng trước khi thuê:</strong> Bao gồm giá thuê, thời gian, địa điểm giao – trả xe, các phụ phí… và nên có hợp đồng thuê xe.
				</li>

				<li>
					<strong>Đọc kỹ hợp đồng thuê xe:</strong> Hợp đồng tuy đơn giản nhưng vẫn cần hiểu rõ các điều khoản để tránh rắc rối.
				</li>

				<li>
					<strong>Kiểm tra xe kỹ lưỡng khi nhận:</strong> Kiểm tra phanh, đèn, còi, khóa cổ, xăng còn lại, vết trầy xước. Nên chụp ảnh hiện trạng xe.
				</li>

				<li>
					<strong>Lưu lại thông tin liên lạc của chủ xe:</strong> Bao gồm tên, số điện thoại, địa chỉ cửa hàng. Có thể dán thông tin trên mũ bảo hiểm hoặc xe.
				</li>
			</ol>

			{/* Bãi Trước */}
			<h2 className="text-xl font-bold mt-10 mb-2">Thuê xe máy Bãi Trước, Vũng Tàu</h2>
			<p className="mb-4">Bãi Trước nằm trên trục đường Quang Trung – Trần Phú, là nơi lý tưởng để ngắm hoàng hôn và dạo bộ ven biển. Thuê xe máy tại đây giúp bạn dễ dàng đi đến ngọn hải đăng, Bãi Sau, Long Hải hoặc Long Sơn.</p>
			<img src={travelImages.baiTruoc} alt="Bãi Trước Vũng Tàu" className="rounded-lg shadow-md mb-6 w-full" />

			{/* Bãi Sau */}
			<h2 className="text-xl font-bold mt-8 mb-2">Thuê xe máy Bãi Sau (Thùy Vân)</h2>
			<p className="mb-4">Bãi Sau là khu vực sôi động, tập trung nhiều khách sạn, quán ăn, homestay và bãi biển đẹp. Thuê xe ở đây giúp bạn thuận tiện đi các điểm như Tượng Chúa Kitô, Mũi Nghinh Phong, hoặc dạo quanh thành phố.</p>
			<img src={travelImages.baiSau} alt="Bãi Sau Vũng Tàu" className="rounded-lg shadow-md mb-6 w-full" />

			{/* Gợi ý điểm phượt */}
			<h2 className="text-xl font-bold mt-10 mb-4">Gợi ý các điểm phượt xe máy tại Vũng Tàu</h2>

			<div className="space-y-8">
				{/* Ngọn hải đăng */}
				<div>
					<h3 className="font-semibold text-lg mb-1">Ngọn hải đăng Vũng Tàu</h3>
					<p className="mb-2">Là ngọn hải đăng cổ nhất Việt Nam (xây từ 1862), từ đây bạn có thể ngắm toàn cảnh thành phố từ trên cao. Lối kiến trúc phương Tây, cầu thang xoắn ốc 55 bậc. Mở cửa từ 7h–22h hàng ngày.</p>
					<img src={travelImages.haiDang} alt="Hải đăng Vũng Tàu" className="rounded-lg shadow-md w-full" />
				</div>

				{/* Mũi Nghinh Phong */}
				<div>
					<h3 className="font-semibold text-lg mt-6 mb-1">Mũi Nghinh Phong</h3>
					<p className="mb-2">Mũi đất vươn ra biển, chia thành hai vịnh lớn: Bãi Dứa và Bãi Vọng Nguyệt. Có khí hậu mát mẻ, lý tưởng để cắm trại, ngắm hoàng hôn, check-in “cổng trời” nổi tiếng hướng biển – lưng tựa núi.</p>
					<img src={travelImages.muiNghinhPhong} alt="Mũi Nghinh Phong Vũng Tàu" className="rounded-lg shadow-md w-full" />
				</div>

				{/* Hồ Đá Xanh */}
				<div>
					<h3 className="font-semibold text-lg mt-6 mb-1">Hồ Đá Xanh</h3>
					<p className="mb-2">Nằm ở sườn núi Dinh, Tân Thành – là địa điểm check-in hot với hồ nước trong xanh giữa núi, đàn cừu, cầu gỗ, xích đu,… Phí tham quan dao động từ 20k – 150k tùy hoạt động.</p>
					<img src={travelImages.hoDaXanh} alt="Hồ Đá Xanh Vũng Tàu" className="rounded-lg shadow-md w-full" />
				</div>

				{/* Hồ Mây - chỉ nội dung */}
				<div>
					<h3 className="font-semibold text-lg mt-6 mb-1">Hồ Mây Vũng Tàu</h3>
					<p className="mb-2">Khu du lịch sinh thái kết hợp vui chơi giải trí trên núi. Phải đi cáp treo để tới. Nơi đây có nhiều hoạt động: trượt zipline, cắm trại, cưỡi ngựa, tham quan vườn sinh thái, công viên nước và trải nghiệm nghỉ dưỡng giữa thiên nhiên.</p>
				</div>
			</div>

			<p className="mt-10">
				<strong>Kết luận:</strong> Thuê xe máy tại Vũng Tàu là cách lý tưởng để bạn chủ động khám phá thành phố biển xinh đẹp này. Hãy nhớ chuẩn bị kỹ càng về giấy tờ, lựa chọn xe phù hợp và liên hệ đơn vị uy tín để có chuyến đi suôn sẻ và an toàn nhé!
			</p>
		</div>
	);
};

export default Rental4;
