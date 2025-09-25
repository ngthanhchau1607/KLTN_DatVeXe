import React from "react";
import InputSearchTrip from "../components/Input/InputSearchTrip";
import Slider from "react-slick";
import {List, Card} from "antd";
import {Link} from "react-router-dom";
import "../Sass/css/Home.css";
export default function Home() {
	const data = [
		{
			title: "Lịch nghỉ Tết 2026: Dương lịch và Âm lịch | Kế hoạch săn vé về quê ",
			img: "./images/ud/tt1.jpeg",
			link: "/article1",
		},
		{
			title: "Một số thủ đoạn giả danh nhà xe , cẩn trọng lưu ý ",
			img: "./images/ud/tt2.jpeg",
			link: "/article2",
		},
		{
			title: "Bí kíp săn deal xe khách",
			img: "./images/ud/tt3.jpeg",
			link: "/article3",
		},
	];

	const data1 = [
		{
			title: "Thuê xe máy tại Bảo Lộc",
			img: "./images/ud/txbl.png",
			link: "/rental1",
		},
		{
			title: "Thuê xe máy tại Đà Lạt",
			img: "./images/ud/txdl.jpeg",
			link: "/rental2",
		},
		{
			title: "Thuê xe máy tại Nha Trang",
			img: "./images/ud/txnt.jpeg",
			link: "/rental3",
		},
		{
			title: "Thuê xe máy tại Vũng Tàu",
			img: "./images/ud/txvt.jpeg",
			link: "/rental4",
		},
	];

	const data2 = [
		{
			title: "Lương về chốt deal - Giảm đến 50% ngày 25 hằng tháng",
			img: "./images/ud/ud4.jpeg",
			link: "/endow1",
		},
		{
			title: "12h - 14h Thứ 3 - Flash sale đến 50%",
			img: "./images/ud/ud2.jpeg",
			link: "/endow2",
		},
		{
			title: "Giảm đến 20% khi đặt vé các nhà xe mới mở",
			img: "./images/ud/ud1.png",
			link: "/endow3",
		},
		{
			title: "Giới thiệu bạn mới - Nhận quà khủng",
			img: "./images/ud/ud2.jpeg",
			link: "/endow4",
		},
	];

	const data3 = [
		{
			title: "Tính năng GPS xem vị trí xe khách ",
			img: "./images/ud/tn1.jpeg",
			link: "/feature1",
		},
		{
			title: "Bí kíp chọn xe khách chất lượng cao",
			img: "./images/ud/tn2.jpeg",
			link: "/feature2",
		},
		{
			title: "Tìm xe theo nhu cầu dựa trên các tiêu chí",
			img: "./images/ud/tn3.jpeg",
			link: "/feature3",
		},
		{
			title: "Cách chọn điểm đón xe gần bạn nhất",
			img: "./images/ud/tn4.jpeg",
			link: "/feature4",
		},
	];

	const settings = {
		className: "center",
		infinite: true,
		autoplay: true,
		slidesToShow: 3,
		swipeToSlide: true,
	};
	return (
		<>
			<div className="home_banner">
				<img src="./images/bn1.png" alt="123" className="img_banner h-64 w-full object-cover" />
				<div className="home_content" style={{marginTop: "150px"}}>
					<div className="home_around w-full">
						<div className="title_banner">
							{/* Bỏ thẻ <a> đi, thay bằng thẻ span hoặc chỉ h2 thôi */}
							<h2 className="homepage__Title-bs2n93-3 LVkvx" style={{color: "black"}}>
								Cam kết hoàn 150% nếu nhà xe không giữ vé
							</h2>
						</div>
					</div>
					<div className="home_search_content w-full">
						<InputSearchTrip />
					</div>
				</div>
			</div>
			<div className="home_slide">
				<div className="home_slide_content">
					<h2 className="home_slide_title mt-5 font-bold text-black text-xl">Ưu đãi nổi bật</h2>
					<div className="home_slide_carousel">
						<Slider {...settings} className="slide_main">
							{data2.map((item, index) => (
								<div key={index} className="px-2">
									<div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
										<Link to={item.link}>
											<img src={item.img} alt={item.title} className="w-full h-60 object-cover rounded-t-lg" />
											<p className="h-14 flex items-center justify-center px-2 text-base font-semibold text-center text-black">{item.title}</p>
										</Link>
									</div>
								</div>
							))}
						</Slider>
					</div>
				</div>
				<div className="home_slide_content">
					<h2 className="home_slide_title mt-5 font-bold text-black text-xl">Tính năng mới</h2>
					<div className="home_slide_carousel">
						<Slider {...settings} className="slide_main">
							{data3.map((item, index) => (
								<div key={index} className="px-2">
									<div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
										<Link to={item.link}>
											<img src={item.img} alt={item.title} className="w-full h-60 object-cover rounded-t-lg" />
											<p className="h-14 flex items-center justify-center px-2 text-base font-semibold text-center text-black">{item.title}</p>
										</Link>
									</div>
								</div>
							))}
						</Slider>
					</div>
				</div>
				<div className="home_slide_content">
					<h2 className="home_slide_title mt-5 font-bold text-black text-xl">Thuê xe máy</h2>
					<div className="home_slide_carousel">
						<Slider {...settings} className="slide_main">
							{data1.map((item, index) => (
								<div key={index} className="px-2">
									<div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
										<Link to={item.link}>
											<img src={item.img} alt={item.title} className="w-full h-60 object-cover rounded-t-lg" />
											<p className="h-14 flex items-center justify-center px-2 text-base font-semibold text-center text-black">{item.title}</p>
										</Link>
									</div>
								</div>
							))}
						</Slider>
					</div>
				</div>

				<div className="home_slide_content2" id="news">
					<h2 className="home_slide_title mt-5 font-bold text-black text-xl">Bài viết nổi bật</h2>
					<List
						grid={{gutter: 24, column: 3}}
						dataSource={data}
						renderItem={(item) => (
							<List.Item style={{padding: "0 8px"}}>
								<Link to={item.link}>
									<Card style={{height: "290px", cursor: "pointer"}} title={<img src={item.img} alt={item.title} style={{height: "200px", width: "100%", objectFit: "cover"}} />} hoverable>
										<p className="font-bold text-sm text-black text-center">{item.title}</p>
									</Card>
								</Link>
							</List.Item>
						)}
					/>
					,
				</div>

				<div className="home_slide_content3">
					<h2 className="home_slide_title">Nền tảng kết nối người dùng và nhà xe</h2>
					<div className="seo-content">
						<div className="card">
							<div className="icon-container">
								<img className=" lazyloaded" data-src="https://storage.googleapis.com/fe-production/svgIcon/bus-car-icon.svg" src="https://storage.googleapis.com/fe-production/svgIcon/bus-car-icon.svg" alt="busCar-icon" />
							</div>
							<div className="card-content">
								<p className="base__Headline-sc-1tvbuqk-7 OkeDq color--light-dark">2000+ nhà xe chất lượng cao</p>
								<p className="base__Body02-sc-1tvbuqk-14 VqdXU color--medium-sub">5000+ tuyến đường trên toàn quốc, chủ động và đa dạng lựa chọn.</p>
							</div>
						</div>
						<div className="card">
							<div className="icon-container">
								<img className=" lazyloaded" data-src="https://storage.googleapis.com/fe-production/svgIcon/yellow-ticket-icon.svg" src="https://storage.googleapis.com/fe-production/svgIcon/yellow-ticket-icon.svg" alt="easybook-icon" />
							</div>
							<div className="card-content">
								<p className="base__Headline-sc-1tvbuqk-7 OkeDq color--light-dark">Đặt vé dễ dàng</p>
								<p className="base__Body02-sc-1tvbuqk-14 VqdXU color--medium-sub">Đặt vé chỉ với 60s. Chọn xe yêu thích cực nhanh và thuận tiện.</p>
							</div>
						</div>
						<div className="card">
							<div className="icon-container">
								<img className=" lazyloaded" data-src="https://storage.googleapis.com/fe-production/svgIcon/completement-icon.svg" src="https://storage.googleapis.com/fe-production/svgIcon/completement-icon.svg" alt="guarantee-icon" />
							</div>
							<div className="card-content">
								<p className="base__Headline-sc-1tvbuqk-7 OkeDq color--light-dark">Đảm bảo có vé</p>
								<p className="base__Body02-sc-1tvbuqk-14 VqdXU color--medium-sub">Hoàn ngay 150% nếu không có vé, mang đến hành trình trọn vẹn.</p>
							</div>
						</div>
						<div className="card">
							<div className="icon-container">
								<img className=" lazyloaded" data-src="https://storage.googleapis.com/fe-production/svgIcon/coupon-icon.svg" src="https://storage.googleapis.com/fe-production/svgIcon/coupon-icon.svg" alt="deal-icon" />
							</div>
							<div className="card-content">
								<p className="base__Headline-sc-1tvbuqk-7 OkeDq color--light-dark">Nhiều ưu đãi</p>
								<p className="base__Body02-sc-1tvbuqk-14 VqdXU color--medium-sub">Hàng ngàn ưu đãi cực chất độc quyền tại VeXeRe.</p>
							</div>
						</div>
					</div>
				</div>
				<div className="home_slide_content5" id="station">
					<h2 className="home_slide_title mt-5">Bến xe nổi bật</h2>
					<div className="grid grid-cols-4 gap-20">
						<a
							href="/station/miendong"
							style={{
								backgroundImage: 'url("https://storage.googleapis.com/fe-production/images/bx-mien-dong.jpg")',
							}}
							className="BusStationCard__Wrapper-sc-759o96-0 kKZSxH lazyloaded"
						>
							<header className="BusStationCard__Header-sc-759o96-1 iSiVXT">Bến xe Miền Đông</header>
						</a>

						<a
							href="/station/quynhon"
							style={{
								backgroundImage: 'url("https://statics.vinwonders.com/ben-xe-quy-nhon-2_1705132243.jpeg")',
							}}
							className="BusStationCard__Wrapper-sc-759o96-0 kKZSxH lazyloaded"
						>
							<header className="BusStationCard__Header-sc-759o96-1 iSiVXT">Bến xe Quy Nhơn</header>
						</a>

						<a
							href="/station/batri"
							style={{
								backgroundImage: 'url("https://tse4.mm.bing.net/th/id/OIP.WfgvNL2NKblTAF20FnoROQHaEL?pid=Api&P=0&h=180")',
							}}
							className="BusStationCard__Wrapper-sc-759o96-0 kKZSxH lazyloaded"
						>
							<header className="BusStationCard__Header-sc-759o96-1 iSiVXT">Bến xe Ba Tri</header>
						</a>

						<a
							href="/station/mydinh"
							style={{
								backgroundImage: 'url("https://storage.googleapis.com/fe-production/images/bx-my-dinh.jpg")',
							}}
							className="BusStationCard__Wrapper-sc-759o96-0 kKZSxH lazyloaded"
						>
							<header className="BusStationCard__Header-sc-759o96-1 iSiVXT">Bến xe Mỹ Đình</header>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
