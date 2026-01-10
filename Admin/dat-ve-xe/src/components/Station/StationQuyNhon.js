import React, {useState} from "react";
import {Input, DatePicker, Button, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {HomeOutlined} from "@ant-design/icons";
import moment from "moment";

const StationQuyNhon = () => {
	const [activeTab, setActiveTab] = useState("price");

	const banners = ["/images/banner/bn1.jpg", "/images/banner/bn2.jpg", "/images/banner/bn3.jpg"];

	const stationInfo = {
		name: "Bến xe Quy Nhơn",
		address: "68 Trần Hưng Đạo, TP. Quy Nhơn, Bình Định",
		phone: "0256 3829 999",
		hours: "Mở cửa: 5:00 – 21:00",
		image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Quy_Nhon_bus_station_2020.jpg",
		description: `Bến xe Quy Nhơn là bến xe chính phục vụ khu vực Bình Định và các tỉnh lân cận, với nhiều tuyến xe khách và dịch vụ vận tải đa dạng.`,
	};

	const stationImages = ["https://cdn.xanhsm.com/2025/03/58eaac9b-ben-xe-quy-nhon-1.jpg", "https://cdn.xanhsm.com/2025/03/e9325e61-ben-xe-quy-nhon-2.jpg", "https://cdn.xanhsm.com/2025/03/523a0ef5-ben-xe-quy-nhon-3.jpg", "https://cdn.xanhsm.com/2025/03/420756a1-ben-xe-quy-nhon-4.jpg"];

	const popularRoutes = [
		{key: 1, route: "Bến xe Quy Nhơn đi Hà Nội", company: "Hạnh Cafe", price: 1000000},
		{key: 2, route: "Bến xe Quy Nhơn đi Đà Nẵng", company: "Phương Trang", price: 400000},
		{key: 3, route: "Bến xe Quy Nhơn đi TP. Hồ Chí Minh", company: "Mai Linh", price: 850000},
		{key: 4, route: "Bến xe Quy Nhơn đi Nha Trang", company: "Cúc Tùng", price: 300000},
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

				<span className="font-semibold text-gray-900">Bến xe</span>

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

			{/* Các dịch vụ, tiện ích */}
			<div className="my-8">
				<h2 className="text-xl font-semibold mb-4">Khám phá những dịch vụ, tiện ích tại bến xe Quy Nhơn</h2>

				<p className="text-gray-700 mb-4 leading-relaxed">Điểm trung chuyển bến xe Quy Nhơn có đầy đủ dịch vụ, tiện ích nhằm mang đến trải nghiệm thoải mái và thuận tiện cho hành khách. Dưới đây là một số dịch vụ, tiện ích được bến xe phục vụ:</p>

				<ul className="list-disc pl-6 space-y-2 text-gray-700">
					<li>
						<strong>Cửa hàng tiện lợi:</strong> Khu vực nhà chờ của bến xe có các quầy bán đồ ăn nhằm phục vụ hành khách có nhu cầu ăn uống trong thời gian chờ xe.
					</li>
					<li>
						<strong>Quầy vé:</strong> Bến xe có nhiều quầy vé của các nhà xe hoạt động từ Quy Nhơn đi các tỉnh, giúp hành khách mua vé nhanh chóng và thuận tiện.
					</li>
					<li>
						<strong>Nhà vệ sinh:</strong> Được chia riêng khu vực nam – nữ, đảm bảo sự thoải mái và tiện nghi cho hành khách.
					</li>
					<li>
						<strong>Máy rút tiền tự động (ATM):</strong> Gần bến xe có máy ATM giúp hành khách dễ dàng rút tiền và thực hiện các giao dịch ngân hàng.
					</li>
					<li>
						<strong>Khu vực đỗ xe:</strong> Rộng rãi, đủ sức chứa nhiều phương tiện như xe khách, xe tải nhỏ, xe máy và ô tô.
					</li>
				</ul>
			</div>

			{/* Banner đơn giản 1 ảnh */}
			<div className="my-8">
				<img src={banners[0]} alt="Banner Quy Nhơn" className="rounded-lg shadow-md object-contain" style={{width: "100%", height: "150px"}} />
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
									<img key={index} src={img} alt={`Bến xe Quy Nhơn ${index + 1}`} className="w-full h-40 md:h-48 object-cover rounded-lg shadow" />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StationQuyNhon;
