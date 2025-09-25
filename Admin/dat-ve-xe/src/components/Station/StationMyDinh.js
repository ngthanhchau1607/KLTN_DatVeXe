import React, {useState} from "react";
import {Input, DatePicker, Button, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import moment from "moment";
import "swiper/css";

const StationMyDinh = () => {
	const [activeTab, setActiveTab] = useState("price");

	const banners = ["/images/banner/bn1.jpg"];

	const stationInfo = {
		name: "Bến xe Mỹ Đình",
		address: "Số 20 Phạm Hùng, Mỹ Đình 2, Nam Từ Liêm, Hà Nội",
		phone: "024 3768 5549",
		hours: "Mở cửa: 4:30 – 21:00",
		image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/B%E1%BA%BFn_xe_M%E1%BB%B9_%C4%90%C3%ACnh.jpg",
		description: "Bến xe Mỹ Đình là một trong những bến xe khách lớn và hiện đại nhất tại Hà Nội, phục vụ các tuyến đường liên tỉnh đến miền Trung, miền Bắc và Tây Bắc.",
	};

	const popularRoutes = [
		{key: 1, route: "Mỹ Đình đi Hải Phòng", company: "Hoàng Long", price: 120000},
		{key: 2, route: "Mỹ Đình đi Lào Cai", company: "Hà Sơn", price: 250000},
		{key: 3, route: "Mỹ Đình đi Thanh Hóa", company: "Cúc Mừng", price: 150000},
		{key: 4, route: "Mỹ Đình đi Điện Biên", company: "Xuân Long", price: 400000},
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
		<div className="max-w-6xl mx-auto p-4 bg-white">
			{/* Thông tin chung */}
			<h1 className="text-3xl font-bold mb-2">{stationInfo.name}</h1>
			<p>
				<strong>Địa chỉ:</strong> {stationInfo.address}
			</p>
			<p>
				<strong>Số điện thoại:</strong> {stationInfo.phone}
			</p>
			<p>
				<strong>Giờ hoạt động:</strong> {stationInfo.hours}
			</p>

			{/* Search Box */}
			<div className="bg-blue-50 p-4 my-6 rounded-md shadow-sm">
				<h2 className="text-xl font-semibold mb-4">So sánh giá và lịch trình các hãng xe ở {stationInfo.name}</h2>
				<div className="flex flex-wrap gap-3 items-center">
					<Input placeholder="Gõ vào nơi đi" className="w-full sm:w-1/3" />
					<span className="text-xl">=</span>
					<Input placeholder="Gõ vào nơi đến" className="w-full sm:w-1/3" />
					<DatePicker defaultValue={moment()} className="w-full sm:w-1/4" />
					<Button type="primary" icon={<SearchOutlined />} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
						Tìm vé xe rẻ
					</Button>
				</div>
			</div>

			{/* Tuyến phổ biến */}
			<div className="my-8">
				<h2 className="text-xl font-semibold mb-4">Đặt nhanh các tuyến đường từ {stationInfo.name}</h2>
				<Table dataSource={popularRoutes} columns={columns} pagination={false} />
			</div>

			{/* Banner đơn giản */}
			<div className="my-8">
				<img src={banners[0]} alt="Banner Mỹ Đình" className="rounded-lg shadow-md object-contain" style={{width: "100%", height: "150px"}} />
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

export default StationMyDinh;
