import React from "react";

export default function Article2() {
	return (
		<div className="max-w-4xl mx-auto py-8 text-gray-800">
			<h1 className="text-3xl font-bold mb-6">Một số thủ đoạn giả danh XeNhanh hoặc nhà xe, cẩn trọng lưu ý khi chia sẻ thông tin cá nhân</h1>

			{/* Hình ảnh đầu bài */}
			<img src="https://f1e425bd6cd9ac6.cmccloud.com.vn/cms-tool/post/images/355/img_hero.png?v=10" alt="Cảnh báo lừa đảo" className="w-full mb-6 rounded-md" />

			<p className="mb-4">Gần đây, XeNhanh ghi nhận một số khách hàng phản ánh nhận cuộc gọi mạo danh XeNhanh hoặc bảo hiểm chuyến đi.</p>

			<h2 className="text-2xl font-semibold mt-8 mb-4">Các thủ đoạn lừa đảo phổ biến:</h2>
			<ul className="list-disc pl-5 space-y-2 mb-6">
				<li>Mạo danh nhà xe/XeNhanh gọi khách báo chuyến đi bị huỷ, sau đó yêu cầu cung cấp thông tin cá nhân để được hoàn tiền (CCCD, màn hình đặt chỗ, thông tin tài khoản ngân hàng, số dư,...)</li>
				<li>Yêu cầu gọi video call để nhận diện khuôn mặt.</li>
				<li>Yêu cầu gửi mã OTP hoặc chuyển khoản cho một tài khoản để “xác minh”.</li>
			</ul>

			<p className="mb-4 font-semibold text-red-600">* Lưu ý: XeNhanh KHÔNG yêu cầu khách hàng thực hiện bất kỳ hành động nào trong các hình thức trên.</p>

			<h2 className="text-2xl font-semibold mt-8 mb-4">Các số điện thoại lừa đảo đã được ghi nhận:</h2>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6 text-sm text-gray-700">
				{["0912604280", "0375601290", "0912607430", "0912607874", "0915275042", "0994311455", "0994310900", "0764633186", "0912609615", "0362854258", "0994310930", "0912802254", "0867261048", "0994310989"].map((number, idx) => (
					<div key={idx} className="bg-gray-100 px-2 py-1 rounded">
						{number}
					</div>
				))}
			</div>

			<h2 className="text-2xl font-semibold mt-8 mb-4">Lưu ý quan trọng để bảo vệ thông tin cá nhân:</h2>

			<ol className="list-decimal pl-5 space-y-3 mb-6">
				<li>
					<strong>XeNhanh chỉ liên hệ khách hàng qua email hoặc các số hotline chính thức.</strong>
					<br />- Email: luôn có đuôi <code>@xenhanh.com</code>
					<br />
					- Số điện thoại chính thức: <br />
					<span className="text-sm text-gray-700">
						VNMB: 0522057767, 0522057790, 0522057806 <br />
						Viettel: 0386385166, 0386430880, 0386403335 <br />
						Mobi: 0901800660, 0931800523, 0901800122 <br />
						Vina: 084911022651, 084911041273, 084911041670 <br />
						FPT: 02873004868
					</span>
					<br />
					Các số chính thức luôn có lời chào giới thiệu là XeNhanh.
				</li>

				<li>
					<strong>XeNhanh KHÔNG yêu cầu khách hàng chuyển khoản đến tài khoản cá nhân.</strong>
					<br />
					Toàn bộ thanh toán chỉ qua tài khoản có tên: <span className="font-semibold">CTY TNHH TMDV XENHANH</span>
				</li>

				<li>
					<strong>XeNhanh chỉ hợp tác với 1 đối tác bảo hiểm duy nhất:</strong> <span className="font-semibold">Saladin</span>.<br />
					Mọi xác nhận hoặc hỗ trợ đều qua hotline chính thức.
				</li>

				<li>
					<strong>Không cung cấp mã OTP, thông tin vé, hoặc chuyển khoản bên ngoài app/website XeNhanh.</strong>
				</li>

				<li>
					<strong>Liên hệ XeNhanh qua các kênh chính thức sau:</strong>
					<br />
					<ul className="list-disc pl-5 mt-2 text-sm text-blue-600 space-y-1">
						<li>
							<a href="https://www.facebook.com/VexereOfficial" target="_blank" rel="noreferrer">
								Fanpage XeNhanh
							</a>
						</li>
						<li>
							<a href="https://zalo.me/4105849197048860730" target="_blank" rel="noreferrer">
								Zalo OA XeNhanh
							</a>
						</li>
						<li>
							Email: <a href="mailto:lienhe@xenhanh.com">lienhe@xenhanh.com</a>
						</li>
						<li>
							Tổng đài: <a href="tel:1900969681">1900 969681</a>
						</li>
					</ul>
				</li>
			</ol>

			<p className="mt-6">🚨 Hãy luôn tỉnh táo trước mọi cuộc gọi, tin nhắn hoặc yêu cầu cung cấp thông tin cá nhân. XeNhanh luôn đồng hành cùng bạn trong những hành trình an toàn và minh bạch.</p>
		</div>
	);
}
