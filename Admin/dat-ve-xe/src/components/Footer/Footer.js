import React from "react";
import "../../Sass/css/Footer.css";

export default function Footer() {
	return (
		<>
			<footer>
				<div className="footer_content">
					<hr />
					<div className="footer_main grid grid-cols-4 gap-6">
						{/* Phần chúng tôi */}
						<div className="footer_about">
							<div className="text-lg font-semibold mb-2">Phần chúng tôi</div>
							<div className="space-y-1 text-sm text-gray-600">
								<p>Phạm Minh Hiếu - MSSV: 211108</p>
								<p>Nguyễn Thành Châu - MSSV: 21110816</p>
							</div>
						</div>

						{/* Kết nối với XeNhanh */}
						<div className="footer_sup">
							<div className="text-lg font-semibold mb-2">Kết nối với XeNhanh</div>
							<div className="flex items-center space-x-4">
								{/* Facebook */}
								<a href="https://facebook.com" target="_blank" rel="noreferrer">
									<img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-10 h-10 hover:opacity-80" />
								</a>

								{/* Instagram */}
								<a href="https://instagram.com" target="_blank" rel="noreferrer">
									<img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-10 h-10 hover:opacity-80" />
								</a>

								{/* TikTok */}
								<a href="https://tiktok.com" target="_blank" rel="noreferrer">
									<img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" className="w-10 h-10 hover:opacity-80" />
								</a>
							</div>
						</div>

						{/* Phương thức thanh toán */}
						<div className="footer_sup">
							<div className="text-lg font-semibold mb-2">Phương thức thanh toán</div>
							<div className="flex items-center space-x-4">
								{/* Logo Momo */}
								<img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="Momo" className="w-16 h-auto" />

								{/* Bạn có thể thêm logo khác tại đây */}
								{/* <img src="..." alt="ZaloPay" className="w-16 h-auto" /> */}
							</div>
						</div>

						{/* Tải ứng dụng */}
						<div className="footer_download">
							<div className="footer_title">Tải ứng dụng đặt vé</div>
							<div className="footer_list">
								<a href="#">
									<img alt="App Store" width={150} height={49} src="https://storage.googleapis.com/fe-production/images/landingpagetet2018/AP-icon.png?v=2" />
								</a>
								<a href="#">
									<img alt="Google Play" width={150} height={49} src="https://storage.googleapis.com/fe-production/images/landingpagetet2018/GP-icon.png?v=2" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</footer>

			{/* Bản quyền */}
			<div className="License__Wrapper-fwwcnv-0 kSJbnI footer_license">
				<div className="License__Ayah-fwwcnv-1 kbYbCv">
					<div
						style={{
							fontSize: "large",
							fontWeight: "bold",
							color: "rgb(77, 77, 77)",
						}}
					>
						Công ty TNHH Thương Mại Dịch Vụ XeNhanh
					</div>
					<div>Địa chỉ đăng ký kinh doanh: Số 1 Võ Văn Ngân , Phường Bình Chiểu , TP. Thủ Đức, Việt Nam</div>
					<div>&copy; 2025 by XeNhanh. All rights reserved.</div>
				</div>
			</div>
		</>
	);
}
