import React, {useState} from "react";
import {Input, DatePicker, Button, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import moment from "moment";
import {Swiper, SwiperSlide} from "swiper/react";
import {HomeOutlined} from "@ant-design/icons";

import "swiper/css";

const StationMienDong = () => {
	const [activeTab, setActiveTab] = useState("price");

	const banners = ["/images/banner/bn1.jpg", "/images/banner/bn2.jpg", "/images/banner/bn3.jpg"];

	const stationInfo = {
		name: "Bến xe Miền Đông",
		address: "292 Đinh Bộ Lĩnh, Bình Thạnh, TP. Hồ Chí Minh",
		phone: "028 3899 4245",
		hours: "Mở cửa: 4:00 – 22:00",
		image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Ben_xe_Mien_Dong.jpg",
		description: `Bến xe Miền Đông là bến xe khách lớn nhất và cũng là một trong những bến xe chính tại TP.HCM...`,
	};

	const stationImages = ["https://motortrip.vn/wp-content/uploads/2021/11/ben-xe-mien-dong-3.jpg", "https://cdn.xanhsm.com/2025/03/88c5259c-ben-xe-mien-dong-cu-1.jpg", "https://cdn.xanhsm.com/2025/03/d2a8fb13-ben-xe-mien-dong-cu-2.jpg", "https://cdn.xanhsm.com/2025/03/b56f7f91-ben-xe-mien-dong-cu-3.jpg"];

	const popularRoutes = [
		{key: 1, route: "Bến xe Miền Đông đi Đà Nẵng", company: "Quốc Tín", price: 300000},
		{key: 2, route: "Bến xe Miền Đông đi Đà Nẵng", company: "A Tý", price: 350000},
		{key: 3, route: "Bến xe Miền Đông đi Đà Nẵng", company: "Minh Phương", price: 440000},
		{key: 4, route: "Bến xe Miền Đông đi Hà Nội", company: "Ngọc Lễ", price: 900000},
	];

	const columns = [
		{
			title: "Tuyến đường",
			dataIndex: "route",
			key: "route",
		},
		{
			title: "Hãng xe",
			dataIndex: "company",
			key: "company",
		},
		{
			title: "Giá",
			dataIndex: "price",
			key: "price",
			render: (text) => `${text.toLocaleString()}₫`,
		},
		{
			title: "",
			dataIndex: "action",
			key: "action",
			render: () => <Button className="bg-yellow-400 text-white font-semibold hover:bg-yellow-500 border-none">Chọn ngay</Button>,
		},
	];

	return (
		<div className="max-w-6xl mx-auto p-4 bg-white mt-1">
			{/* Breadcrumb */}
			<div className="flex items-center text-gray-600 text-sm mb-3 gap-2">
				<HomeOutlined className="text-lg text-gray-500" />

				<a href="/" className="hover:text-blue-600 transition">
					Trang chủ
				</a>

				<span>/</span>

				<span className="font-semibold text-gray-900 ">Bến xe</span>

				<span>/</span>

				<span className="font-semibold text-gray-900">{stationInfo.name}</span>
			</div>

			{/* Tiêu đề */}
			<h1 className="text-3xl font-bold mb-4">{stationInfo.name}</h1>

			<p className="text-lg mb-1">
				<strong className="font-semibold text-gray-800">Địa chỉ:</strong> {stationInfo.address}
			</p>

			<p className="text-lg mb-1">
				<strong className="font-semibold text-gray-800">Số điện thoại:</strong> {stationInfo.phone}
			</p>

			<p className="text-lg mb-4">
				<strong className="font-semibold text-gray-800">Giờ hoạt động:</strong> {stationInfo.hours}
			</p>

			{/* Tuyến phổ biến */}
			{/* <div className="my-8">
				<h2 className="text-xl font-semibold mb-4">Đặt nhanh các tuyến đường từ {stationInfo.name}</h2>
				<Table dataSource={popularRoutes} columns={columns} pagination={false} />
			</div> */}

			{/* Các dịch vụ, tiện ích */}
			<div className="my-8">
				<h2 className="text-xl font-semibold mb-4">Các dịch vụ, tiện ích tại bến xe Miền Đông cũ</h2>

				<p className="text-gray-700 mb-4 leading-relaxed">Sau khi ngừng khai thác một số tuyến xe khách cố định, các dịch vụ và tiện ích tại bến xe Miền Đông cũ đã có nhiều thay đổi. Hiện tại, các dịch vụ chủ yếu bao gồm:</p>

				<ul className="list-disc pl-6 space-y-2 text-gray-700">
					<li>
						<strong>Quầy vé:</strong> Thuận tiện cho khách hàng mua vé trực tiếp, thanh toán nhanh chóng.
					</li>
					<li>
						<strong>Phòng chờ:</strong> Rộng rãi, thoáng mát, có ghế ngồi, quạt và wifi.
					</li>
					<li>
						<strong>Khu vực giữ hành lý:</strong> Có bảo vệ túc trực thường xuyên, đảm bảo an toàn.
					</li>
					<li>
						<strong>Các cửa hàng nhỏ lẻ:</strong> Cung cấp các mặt hàng thiết yếu như thuốc, thực phẩm…
					</li>
					<li>
						<strong>Nhà hàng, quán ăn:</strong> Tập trung xung quanh bến xe, bán đa dạng món như bún, phở, mì, miến…
					</li>
					<li>
						<strong>Dịch vụ hỗ trợ xe buýt:</strong> Điểm bán vé, cung cấp thông tin tuyến xe buýt.
					</li>
					<li>
						<strong>Bãi đỗ xe:</strong> Duy trì bãi đỗ cho phương tiện cá nhân và xe buýt.
					</li>
					<li>
						<strong>Nhà vệ sinh:</strong> Có khu vực phục vụ nhu cầu sinh hoạt của hành khách.
					</li>
				</ul>
			</div>

			{/* Banner đơn giản 1 ảnh */}
			<div className="my-8">
				<img src={banners[0]} alt="Banner 1" className="rounded-lg shadow-md object-contain" style={{width: "100%", height: "150px"}} />
			</div>

			<div className="max-w-6xl mx-auto my-10 px-4">
				<div className="bg-white shadow-md rounded-lg border">
					<div className="flex w-full border-b border-gray-200">
						{["price", "contact", "review", "image"].map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`flex-1 text-center px-5 py-3 text-sm font-medium transition-all duration-200
                  ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}`}
							>
								{tab === "price" && "BẢNG GIÁ"}
								{tab === "contact" && "SỐ ĐIỆN THOẠI - ĐỊA CHỈ"}
								{tab === "review" && "ĐÁNH GIÁ"}
								{tab === "image" && "HÌNH ẢNH"}
							</button>
						))}
					</div>

					<div className="p-6">
						{activeTab === "price" && (
							<>
								<h2 className="text-lg font-semibold mb-4">Bảng giá xe khách {stationInfo.name} mới nhất Tháng 9 năm 2025</h2>
								<Table dataSource={popularRoutes} columns={columns} pagination={false} bordered />
							</>
						)}

						{activeTab === "contact" && (
							<div className="space-y-2 text-gray-700">
								<p>
									<strong>Địa chỉ:</strong> {stationInfo.address}
								</p>
								<p>
									<strong>Số điện thoại:</strong> {stationInfo.phone}
								</p>
								<p>
									<strong>Giờ hoạt động:</strong> {stationInfo.hours}
								</p>
							</div>
						)}

						{activeTab === "review" && <p className="text-gray-600">Hiện tại chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!</p>}

						{activeTab === "image" && (
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{stationImages.map((img, index) => (
									<img key={index} src={img} alt={`Ảnh ${index + 1}`} className="w-full h-40 md:h-48 object-cover rounded-lg shadow" />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StationMienDong;
