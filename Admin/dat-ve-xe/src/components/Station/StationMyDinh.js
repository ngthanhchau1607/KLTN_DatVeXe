import React, {useState} from "react";
import {Input, DatePicker, Button, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import moment from "moment";
import {HomeOutlined} from "@ant-design/icons";
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

	const stationImages = ["https://cdn.xanhsm.com/2025/03/61265918-ben-xe-my-dinh-2.jpg", "https://cdn.xanhsm.com/2025/03/2460be44-ben-xe-my-dinh-3.jpg", "https://cdn.xanhsm.com/2025/03/44a80e72-ben-xe-my-dinh-4.jpg", "https://cdn.xanhsm.com/2025/03/7a9cd59d-ben-xe-my-dinh-5.jpg"];

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

			{/* Đặt vé online */}
			<div className="my-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
				<h2 className="text-xl font-semibold mb-3">Đặt vé online trên website</h2>

				<p className="text-gray-700 mb-4 leading-relaxed">Với sự phát triển của công nghệ, hành khách có thể dễ dàng đặt vé xe tại bến xe Mỹ Đình thông qua website. Cách này giúp tiết kiệm thời gian, tránh tình trạng xếp hàng chờ đợi và đảm bảo có vé cho chuyến đi mong muốn.</p>

				<p className="text-gray-700 mb-3">Đối với hình thức đặt vé này bạn thực hiện theo các bước sau đây:</p>

				<ol className="list-decimal pl-6 space-y-2 text-gray-700">
					<li>
						<strong>Bước 1:</strong> Truy cập vào trang web của nhà xe hoặc bến xe Mỹ Đình.
					</li>
					<li>
						<strong>Bước 2:</strong> Tìm kiếm và chọn chuyến xe phù hợp.
					</li>
					<li>
						<strong>Bước 3:</strong> Chọn ngày đi và số lượng vé.
					</li>
					<li>
						<strong>Bước 4:</strong> Điền thông tin cá nhân đầy đủ và chính xác.
					</li>
					<li>
						<strong>Bước 5:</strong> Hoàn thành và chờ đợi nhà xe xác nhận.
					</li>
				</ol>
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

						{activeTab === "image" && (
							<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{stationImages.map((img, index) => (
									<img key={index} src={img} alt={`Bến xe Mỹ Đình ${index + 1}`} className="w-full h-40 md:h-48 object-cover rounded-lg shadow" />
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StationMyDinh;
