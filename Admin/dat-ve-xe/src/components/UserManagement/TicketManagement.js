import React, {useEffect} from "react";
import "../../Sass/css/ticket.css";
import {Breadcrumb, Card, Tabs, Avatar, Popconfirm, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {SET_MODAL} from "../../redux/types/ModalTypes";
import DetailsTicket from "./DetailsTicket";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {HomeOutlined, UserOutlined, FileTextOutlined, DeleteFilled} from "@ant-design/icons";
import moment from "moment";
import {cancelTicketUser, getTicketUser} from "../../redux/actions/ticketAction";
import {TOKEN, USER_LOGIN} from "../../util/settings/config";
import {history} from "../../App";

const {TabPane} = Tabs;
const {Meta} = Card;

export default function TicketManagement() {
	const {ticketUser} = useSelector((state) => state.TicketReducer);
	const {userLogin} = useSelector((state) => state.userReducer);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getTicketUser(userLogin.id));
	}, []);

	function confirm(id) {
		dispatch(cancelTicketUser(id));
	}

	const renderTicketDepart = (status) => {
		return ticketUser.map((item) => {
			if (item.status === status) {
				return (
					<Card
						key={item.id}
						style={{width: "100%"}}
						cover={<img alt="example" src={item.tripPassengerTicket.passenger.imageIntro} height={120} />}
						actions={[
							<VisibilityOutlinedIcon
								key="view"
								onClick={() => {
									dispatch({
										type: SET_MODAL,
										content: <DetailsTicket ticket={item} />,
										width: 700,
									});
								}}
								style={{cursor: "pointer"}}
							/>,
							item.status === "cancel" ? null : (
								<Popconfirm
									placement="topRight"
									title={"Bạn có muốn hủy vé xe này không?"}
									onConfirm={() => {
										if (item.tripPassengerTicket.status === "depart") {
											confirm(item.id);
										} else {
											message.error("Không thể hủy vé");
										}
									}}
									okText="Yes"
									cancelText="No"
								>
									<DeleteFilled key="delete" style={{cursor: "pointer"}} />
								</Popconfirm>
							),
						]}
					>
						<Meta
							style={{fontSize: 12}}
							avatar={<Avatar src="https://storage.googleapis.com/fe-production/images/ticket.svg" />}
							title={`Vé xe số ${item.id}`}
							description={
								<>
									<div>
										<p>
											Vé Xe Đi <span className="font-bold">{item.tripPassengerTicket.trip.to.province}</span> từ <span className="font-bold">{item.tripPassengerTicket.trip.from.province}</span>
										</p>
									</div>
									<div>
										<p>
											Thời gian khởi hành: <span className="font-bold">{moment(item.tripPassengerTicket.trip.startTime).format("DD-MM-YYYY")}</span> lúc <span className="font-bold">{item.tripPassengerTicket.startTime}</span>
										</p>
									</div>
								</>
							}
						/>
					</Card>
				);
			}
			return null;
		});
	};

	// Sidebar menu items
	const menuItems = [
		{
			label: "Thông tin tài khoản",
			icon: "https://storage.googleapis.com/fe-production/images/Auth/account-circle.svg",
			onClick: () => history.push("/usermgt"),
		},
		{
			label: "Vé của tôi",
			icon: "https://storage.googleapis.com/fe-production/images/ticket.svg",
			onClick: () => history.push("/ticketmgt"),
		},
		{
			label: "Nhận xét của tôi",
			icon: "https://storage.googleapis.com/fe-production/images/review.svg",
			onClick: () => history.push("/commentmgt"),
		},
		{
			label: "Đổi mật khẩu",
			icon: "https://www.svgrepo.com/show/448957/change-password.svg",
			onClick: () => history.push("/changepassword"), // cập nhật đường dẫn phù hợp
		},
		{
			label: "Đăng xuất",
			icon: "https://storage.googleapis.com/fe-production/images/Auth/logout.svg",
			onClick: () => {
				localStorage.removeItem(USER_LOGIN);
				localStorage.removeItem(TOKEN);
				window.location.reload();
			},
		},
	];

	return (
		<div className="ticket">
			<div className="ticket-container">
				{/* Breadcrumb */}
				<div className="bread-cump mb-6 mt-6">
					<Breadcrumb className="text-[20px] font-semibold flex items-center gap-2">
						<Breadcrumb.Item>
							<HomeOutlined className="text-[28px]" />
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<FileTextOutlined className="text-[28px]" />
							<span className="text-[20px] ml-2">Vé của tôi</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>

				{/* Main layout */}
				<div className="ticket_management">
					<div className="grid grid-cols-12 gap-5">
						{/* Sidebar menu */}
						<div className="col-span-4">
							<Card
								style={{
									width: "100%",
									height: "100%",
									minHeight: "300px",
									display: "flex",
									flexDirection: "column",
									padding: 0,
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										height: "100%",
									}}
								>
									{menuItems.map((item, index) => (
										<div
											key={index}
											onClick={item.onClick}
											style={{
												flex: 1,
												display: "flex",
												alignItems: "center",
												cursor: "pointer",
												padding: "16px",
												borderBottom: index !== menuItems.length - 1 ? "1px solid #f0f0f0" : "none",
											}}
										>
											<img src={item.icon} width={24} height={16} alt={item.label} />
											<span style={{fontSize: "18px", marginLeft: 10}}>{item.label}</span>
										</div>
									))}
								</div>
							</Card>
						</div>

						{/* Ticket content with Tabs */}
						<div className="col-span-8">
							<Tabs type="card">
								<TabPane tab="Vé đã đặt" key="1">
									<div className="grid grid-cols-3 gap-4">{renderTicketDepart("pending")}</div>
								</TabPane>

								<TabPane tab="Vé đã hủy" key="3">
									<div className="grid grid-cols-3 gap-4">{renderTicketDepart("cancel")}</div>
								</TabPane>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
