import React, {useState} from "react";
import {Button, Modal, Menu, Dropdown, message, Space, Tooltip, Popover} from "antd";
import {UserOutlined, DownOutlined} from "@ant-design/icons";
import _ from "lodash";
import "../../Sass/css/Header.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import {useSelector} from "react-redux";
import {TOKEN, USER_LOGIN} from "../../util/settings/config";
import MessengerCustomerChat from "react-messenger-customer-chat";
import {Link} from "react-router-dom";
import {MessengerChat} from "react-messenger-chat-plugin";

import {history} from "../../App";

export default function Header() {
	const {userLogin} = useSelector((state) => state.userReducer);
	const [modal, setModal] = useState(false);
	const [toggle, setToggle] = useState(true);
	const menu = (
		<Menu>
			<Menu.Item key="1">
				<a
					onClick={() => {
						history.push("/usermgt");
					}}
				>
					<span>
						<img src="https://storage.googleapis.com/fe-production/images/Auth/account-circle.svg" width={16} height={16} alt className="mr-2" />
						<span style={{fontSize: 12}}>Thông tin tài khoản</span>
					</span>
				</a>
			</Menu.Item>
			<Menu.Item key="2">
				<a
					onClick={() => {
						history.push("/ticketmgt");
					}}
				>
					<span>
						<img src="https://storage.googleapis.com/fe-production/images/ticket.svg" width={16} height={16} alt className="mr-2" />

						<span style={{fontSize: 12}}>Vé của tôi</span>
					</span>
				</a>
			</Menu.Item>
			<Menu.Item key="3">
				<a
					onClick={() => {
						history.push("/commentmgt");
					}}
				>
					<span>
						<img src="https://storage.googleapis.com/fe-production/images/review.svg" width={16} height={16} alt className="mr-2" />
						<span style={{fontSize: 12}}>Nhận xét của tôi</span>
					</span>
				</a>
			</Menu.Item>
			<Menu.Item key="4">
				<a
					onClick={() => {
						localStorage.removeItem(USER_LOGIN);
						localStorage.removeItem(TOKEN);
						window.location.reload();
					}}
				>
					<span>
						<img src="https://storage.googleapis.com/fe-production/images/Auth/logout.svg" width={16} height={16} alt className="mr-2" />
						<span style={{fontSize: 12}}>Đăng xuất</span>
					</span>
				</a>
			</Menu.Item>
		</Menu>
	);
	const renderAccount = () => {
		if (_.isEmpty(userLogin)) {
			return (
				<Button className="btn_login" type="primary" shape="round" size={"small"} onClick={() => setModal(true)}>
					<img src="https://storage.googleapis.com/fe-production/images/Auth/account-circle-fill.svg" alt height={16} width={16} />
					Đăng nhập
				</Button>
			);
		}
		return (
			<Dropdown overlay={menu}>
				<Button className="btn_login" type="primary" shape="round" size={"small"}>
					<img src="https://storage.googleapis.com/fe-production/images/Auth/account-circle-fill.svg" alt height={16} width={16} />
					<DownOutlined />
				</Button>
			</Dropdown>
		);
	};

	return (
		<div className="bg-white text-gray-800 text-sm shadow-md">
			<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
				{/* Left: Logo + Slogan sát trái */}
				<div className="flex items-center gap-4">
					<Link to="/">
						<img src="/xenhanh.png" alt="XeNhanh Logo" className="h-14 object-contain cursor-pointer" />
					</Link>
					<div className="text-gray-800 font-semibold text-base">XeNhanh – Đồng hành mọi chặng đường!</div>
				</div>

				{/* Right: Menu + Language + Hotline + Login */}
				<div className="flex items-center gap-6 text-sm font-medium">
					<span className="hover:text-blue-600 transition cursor-default">Uy tín</span>
					<span className="hover:text-blue-600 transition cursor-default mx-4">Giá rẻ</span>
					<span className="hover:text-blue-600 transition cursor-default">Chất lượng</span>

					{/* Language: Vietnamese flag */}
					<img src="https://flagcdn.com/w40/vn.png" alt="Vietnamese" className="w-6 h-4 object-cover rounded-sm" />

					{/* Hotline button - trắng nền, xanh viền */}
					<Popover
						placement="bottom"
						trigger="click"
						overlayInnerStyle={{padding: "10px 14px", borderRadius: 8}}
						title={<div className="text-gray-800 font-semibold text-sm border-b pb-1">Liên hệ Tổng đài</div>}
						content={
							<div className="space-y-1 text-sm text-gray-700">
								<div className="flex items-center justify-between gap-4">
									<span className="whitespace-nowrap">CSKH:</span>
									<a href="tel:09323232222" className="text-blue-600 hover:text-blue-700 transition">
										0932 323 222
									</a>
								</div>
								<div className="flex items-center justify-between gap-4">
									<span className="whitespace-nowrap">Kỹ thuật:</span>
									<a href="tel:0988111222" className="text-blue-600 hover:text-blue-700 transition">
										0988 111 222
									</a>
								</div>
							</div>
						}
					>
						<button className="bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded-md hover:bg-blue-50 transition text-sm">Hotline 24/7</button>
					</Popover>

					{/* Login/Account */}
					{renderAccount()}
					<Modal title={toggle ? "Đăng nhập" : "Đăng ký"} centered open={modal} onOk={() => setModal(false)} onCancel={() => setModal(false)} footer={null}>
						{toggle ? <Login toggle={toggle} setToggle={setToggle} setModal={setModal} /> : <Register toggle={toggle} setToggle={setToggle} />}
					</Modal>
				</div>
			</div>
		</div>
	);
}
