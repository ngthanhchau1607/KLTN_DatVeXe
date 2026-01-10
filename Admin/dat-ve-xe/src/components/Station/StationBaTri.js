import React, {useState} from "react";
import {Input, DatePicker, Button, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {HomeOutlined} from "@ant-design/icons";
import moment from "moment";
import "swiper/css";

const StationBaTri = () => {
	const [activeTab, setActiveTab] = useState("price");

	const banners = ["/images/banner/bn1.jpg"];

	const stationInfo = {
		name: "Bến xe Ba Tri",
		address: "QL57, thị trấn Ba Tri, huyện Ba Tri, tỉnh Bến Tre",
		phone: "0275 3760 123",
		hours: "Mở cửa: 5:00 – 20:00",
		image: "https://media.baodautu.vn/Images/duylong/2019/10/03/ben-xe-ben-tre.jpg",
		description: "Bến xe Ba Tri là một trong những bến xe chính tại tỉnh Bến Tre, phục vụ nhu cầu đi lại giữa Ba Tri và các tỉnh miền Trung, miền Bắc, và TP.HCM.",
	};

	const popularRoutes = [
		{key: 1, route: "Ba Tri đi TP.HCM", company: "Phương Trang", price: 120000},
		{key: 2, route: "Ba Tri đi TP.HCM", company: "Thanh Bình", price: 110000},
		{key: 3, route: "Ba Tri đi Vũng Tàu", company: "Hoa Mai", price: 160000},
		{key: 4, route: "Ba Tri đi Cần Thơ", company: "Mai Linh", price: 90000},
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

			{/* Banner đơn giản */}
			<div className="my-8">
				<img src={banners[0]} alt="Banner Ba Tri" className="rounded-lg shadow-md object-contain" style={{width: "100%", height: "150px"}} />
			</div>

			{/* Tabs */}
			<div className="max-w-6xl mx-auto my-10 px-4">
				<div className="bg-white shadow-md rounded-lg border">
					<div className="flex w-full border-b border-gray-200">
						{["price", "contact", "review", "image"].map((tab) => (
							<button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 text-center px-5 py-3 text-sm font-medium transition-all duration-200 ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}`}>
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

						{activeTab === "image" && <img src={stationInfo.image} alt={stationInfo.name} className="w-full max-h-[500px] object-cover rounded-lg shadow-md" />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StationBaTri;
