import React from "react";

export default function Article3() {
	return (
		<div className="max-w-4xl mx-auto py-8 text-gray-800">
			<h1 className="text-3xl font-bold mb-6">Bí kíp săn deal xe khách giá hời khi đặt dịch vụ tại XeNhanh</h1>

			<img src="https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/291/img_hero.png?v=5" alt="Săn deal XeNhanh" className="w-full mb-6 rounded-md" />

			<p className="mb-4">XeNhanh là hệ thống hỗ trợ đặt dịch vụ xe khách trực tuyến lớn nhất tại Việt Nam. Không chỉ cung cấp dịch vụ vận tải hành khách trên nhiều tuyến đường khắp cả nước với đa dạng dòng xe, hãng xe, giờ xuất bến linh hoạt, XeNhanh còn có rất nhiều ưu đãi hàng tháng, giúp khách hàng dễ dàng đặt được dịch vụ của các hãng xe chất lượng cao với mức giá tốt nhất.</p>

			<h2 className="text-2xl font-semibold mt-8 mb-4">Các chương trình ưu đãi hiện có tại XeNhanh</h2>

			<div className="space-y-6">
				<div>
					<h3 className="font-bold">🎯 Flash Sale - Săn deal giờ vàng giảm đến 50%</h3>
					<ul className="list-disc pl-5 text-gray-700">
						<li>Ưu đãi: 20% và 50%</li>
						<li>Áp dụng: Tất cả khách hàng đặt trên website/app XeNhanh</li>
						<li>Tần suất: 2 lần/tháng</li>
					</ul>
					<p className="mt-2">
						Cách nhận biết nhà xe có Flash Sale:
						<ul className="list-disc pl-8">
							<li>
								🔍 <strong>Cách 1:</strong> Sử dụng bộ lọc “Flash Sale 50%”
							</li>
							<li>
								🔍 <strong>Cách 2:</strong> Thông tin hiển thị trực tiếp tại phần chi tiết chuyến xe:
							</li>
							<ul className="list-disc pl-8 text-sm">
								<li>✔️ Giảm 50% – tối đa 250K</li>
								<li>✔️ Giảm 20% – tối đa 250K</li>
							</ul>
						</ul>
					</p>
				</div>

				<div>
					<h3 className="font-bold">🆕 Ưu đãi cho khách hàng mới</h3>
					<ul className="list-disc pl-5 text-gray-700">
						<li>Ưu đãi: 20% và 25%</li>
						<li>Áp dụng: Khách hàng lần đầu đặt tại XeNhanh</li>
					</ul>
					<p className="mt-2">
						Cách nhận biết:
						<ul className="list-disc pl-8">
							<li>
								🔍 <strong>Cách 1:</strong> Dùng bộ lọc “Ưu đãi đến 25% cho bạn mới”
							</li>
							<li>
								🔍 <strong>Cách 2:</strong> Thông tin hiển thị tại chi tiết chuyến xe:
								<ul className="list-disc pl-6 text-sm">
									<li>✔️ Mã giảm 25%</li>
									<li>✔️ Mã giảm 20%</li>
								</ul>
							</li>
						</ul>
					</p>
				</div>

				<div>
					<h3 className="font-bold">🎁 Giảm giá trực tiếp từ hãng xe</h3>
					<p>Ưu đãi và thời gian tùy theo từng nhà xe, áp dụng cho tất cả khách hàng.</p>
				</div>

				<div>
					<h3 className="font-bold">🔁 Ưu đãi khi đặt dịch vụ khứ hồi</h3>
					<p>Ưu đãi tùy nhà xe, dành cho mọi khách hàng đặt khứ hồi tại XeNhanh.</p>
				</div>

				<div>
					<h3 className="font-bold">⏰ Ưu đãi khi đặt chỗ sớm hoặc cận giờ</h3>
					<p>Giảm giá tùy hãng xe – cơ hội đặt xe giá hời dù sớm hay trễ.</p>
				</div>

				<div>
					<h3 className="font-bold">💳 Ưu đãi từ đối tác thanh toán</h3>
					<p>Mức giảm, thời gian và đối tượng tùy theo đối tác thanh toán. Có thể kiểm tra tại:</p>
					<ul className="list-disc pl-8 text-sm">
						<li>✔️ Trang chủ XeNhanh – mục “Ưu đãi đối tác thanh toán”</li>
						<li>✔️ Trang Thanh toán khi đặt chỗ</li>
					</ul>
				</div>
			</div>

			<h2 className="text-2xl font-semibold mt-10 mb-4">Hướng dẫn đặt dịch vụ xe khách giá ưu đãi tại XeNhanh</h2>

			<ol className="list-decimal pl-6 space-y-4 text-gray-700">
				<li>
					Truy cập website{" "}
					<a href="https://xenhanh.com" className="text-blue-600 hover:underline">
						https://xenhanh.com
					</a>{" "}
					hoặc mở app XeNhanh. <br />
					Chọn điểm đi, điểm đến, ngày đi, nhấn <strong>“Tìm kiếm”</strong>. Bật tùy chọn <strong>“Khứ hồi”</strong> nếu cần.
				</li>
				<li>Chọn chuyến xe phù hợp với thời gian, hãng xe, vị trí ghế.</li>
				<li>Chọn chỗ, điểm đón/trả, nhập thông tin hành khách.</li>
				<li>Kiểm tra lại thông tin đặt chỗ kỹ lưỡng.</li>
				<li>
					Nhập <strong>mã giảm giá</strong> nếu có, chọn phương thức thanh toán và tiến hành đặt chỗ.
				</li>
			</ol>

			<p className="mt-6">🚀 Với hàng loạt chương trình ưu đãi linh hoạt, XeNhanh mang đến cơ hội tiết kiệm chi phí tối đa cho mọi chuyến đi của bạn. Đừng bỏ lỡ những deal siêu hot – săn vé ngay hôm nay nhé!</p>
		</div>
	);
}
