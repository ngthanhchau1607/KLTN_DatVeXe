import React, {Fragment, useState} from "react";
import {Layout, Menu, Avatar, Dropdown} from "antd";
import {IdcardOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined, DownOutlined, CarOutlined, MoneyCollectOutlined, TagOutlined} from "@ant-design/icons";
import CarRentalIcon from "@mui/icons-material/CarRental";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import DirectionsTransitIcon from "@mui/icons-material/DirectionsTransit";
import {Redirect, Route} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../App";
import {CHANGE_KEY} from "../../redux/types/AdminTypes";
import {TOKEN, USER_LOGIN} from "../../util/settings/config";

const {Header, Content, Footer, Sider} = Layout;

export default function AdminTemplate(props) {
	const {key} = useSelector((state) => state.AdminReducer);
	const {userLogin} = useSelector((state) => state.userReducer);
	const dispatch = useDispatch();
	const {Component, ...restProps} = props;
	const [collapsed, setCollapsed] = useState(false);
	const changeCollapsed = () => {
		setCollapsed(!collapsed);
	};

	const menu = (
		<Menu>
			<Menu.Item
				key="0"
				onClick={() => {
					localStorage.removeItem(USER_LOGIN);
					localStorage.removeItem(TOKEN);
					window.location.reload();
				}}
			>
				<a>Đăng Xuất</a>
			</Menu.Item>
		</Menu>
	);

	if (userLogin.type !== "ADMIN") {
		alert("Bạn không có quyền truy cập vào trang này !");
		return <Redirect to="/" />;
	}

	return (
		<Route
			{...restProps}
			render={(propsRoute) => {
				return (
					<Fragment>
						<Layout style={{minHeight: "100vh"}}>
							{/* SIDER MENU - sidebar màu trắng */}
							<Sider
								collapsible
								collapsed={collapsed}
								onCollapse={changeCollapsed}
								style={{
									background: "#fff",
									borderRight: "1px solid #e0e0e0",
								}}
							>
								<div className="logo flex justify-center items-center mt-5 mb-5">
									<img src="/xenhanh.png" alt="Logo" style={{width: collapsed ? 40 : 100}} />
								</div>

								<Menu theme="light" defaultSelectedKeys={[key]} mode="inline">
									<Menu.Item
										key="1"
										icon={<UserOutlined />}
										style={{height: 60}}
										onClick={() => {
											history.push("/admin/user");
											dispatch({type: CHANGE_KEY, key: "1"});
										}}
									>
										Quản Lý Người Dùng
									</Menu.Item>

									<Menu.Item
										key="2"
										icon={<DepartureBoardIcon />}
										style={{height: 60}}
										onClick={() => {
											history.push("/admin/trip");
											dispatch({type: CHANGE_KEY, key: "2"});
										}}
									>
										Quản Lý Chuyến Đi
									</Menu.Item>

									<Menu.Item
										key="3"
										icon={<DirectionsTransitIcon />}
										style={{height: 60}}
										onClick={() => {
											history.push("/admin/passenger");
											dispatch({type: CHANGE_KEY, key: "3"});
										}}
									>
										Quản Lý Nhà Xe
									</Menu.Item>

									<Menu.Item
										key="4"
										icon={<CarOutlined />}
										style={{height: 60}}
										onClick={() => {
											history.push("/admin/vehicle");
											dispatch({type: CHANGE_KEY, key: "4"});
										}}
									>
										Quản Lý Xe
									</Menu.Item>

									<Menu.Item
										key="5"
										icon={<MoneyCollectOutlined />}
										style={{height: 60}}
										onClick={() => {
											history.push("/admin/turnover");
											dispatch({type: CHANGE_KEY, key: "5"});
										}}
									>
										Thống Kê
									</Menu.Item>

									<Menu.Item
										key="6"
										icon={<IdcardOutlined />}
										style={{height: 60}}
										onClick={() => {
											history.push("/admin/ticket");
											dispatch({type: CHANGE_KEY, key: "6"});
										}}
									>
										Quản Lý Vé
									</Menu.Item>

									<Menu.Item
										key="7"
										icon={<CarRentalIcon />}
										style={{height: 60}}
										onClick={() => {
											history.push("/admin/station");
											dispatch({type: CHANGE_KEY, key: "7"});
										}}
									>
										Quản Lý Bến Xe
									</Menu.Item>
									<Menu.Item
										key="8"
										icon={<TagOutlined />}
										style={{height: 60}}
										onClick={() => {
											history.push("/admin/voucher");
											dispatch({type: CHANGE_KEY, key: "8"});
										}}
									>
										Quản Lý Voucher
									</Menu.Item>
								</Menu>
							</Sider>

							{/* MAIN CONTENT */}
							<Layout className="site-layout">
								<Header className="site-layout-background flex justify-end" style={{padding: "0 20px", background: "#fff", borderBottom: "1px solid #e0e0e0"}}>
									<Dropdown overlay={menu} trigger={["click"]} className="cursor-pointer">
										<div className="flex items-center gap-2">
											<Avatar style={{backgroundColor: "#7265e6"}} size="large">
												{userLogin?.name?.charAt(0)}
											</Avatar>
											<span className="text-base">Xin chào, {userLogin?.name}</span>
										</div>
									</Dropdown>
								</Header>

								<Content style={{margin: "20px", background: "#fff", padding: "20px", minHeight: "auto"}}>
									<Component {...propsRoute} />
								</Content>

								<Footer style={{textAlign: "center", background: "#fff", borderTop: "1px solid #eee"}}>© 2025 XeNhanh.vn Admin</Footer>
							</Layout>
						</Layout>
					</Fragment>
				);
			}}
		/>
	);
}
