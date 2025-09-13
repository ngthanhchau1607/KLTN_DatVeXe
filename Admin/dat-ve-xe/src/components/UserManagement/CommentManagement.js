import React, {useEffect, useState} from "react";
import "../../Sass/css/ticket.css";
import {Breadcrumb, Card, Collapse, Comment, List, Form, Input, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {HomeOutlined, UserOutlined, MessageOutlined} from "@ant-design/icons";
import moment from "moment";
import {history} from "../../App";
import {getAllPassenger} from "../../redux/actions/passengerAction";
import {createCommentUserAction, getCommentUserAction} from "../../redux/actions/commentAction";
import {TOKEN, USER_LOGIN} from "../../util/settings/config";

const {TextArea} = Input;
const {Panel} = Collapse;

export default function CommentManagement() {
	const dispatch = useDispatch();
	const {listPassenger} = useSelector((state) => state.PassengerReducer);
	const {userLogin} = useSelector((state) => state.userReducer);
	const {listCommentUser} = useSelector((state) => state.CommentReducer);

	useEffect(() => {
		dispatch(getAllPassenger());
	}, [dispatch]);

	const handleCollapseChange = (keys) => {
		if (keys.length) {
			dispatch(getCommentUserAction(userLogin.id, keys[0]));
		}
	};

	const onFinish = (values, passengerId) => {
		const userComment = {
			userId: userLogin.id,
			content: values.content,
			passengerId,
		};
		dispatch(createCommentUserAction(userComment));
	};

	const renderCommentPanels = () =>
		listPassenger.map((passenger) => (
			<Panel header={`Nhà xe ${passenger.name}`} key={passenger.id} style={{fontWeight: "600"}}>
				<List
					className="comment-list"
					itemLayout="horizontal"
					dataSource={listCommentUser}
					locale={{emptyText: "Chưa có nhận xét nào."}}
					renderItem={(item) => (
						<li>
							<Comment author={item.userComment?.name} avatar={"https://joeschmoe.io/api/v1/random"} content={item.content} datetime={moment(item.createdAt).fromNow()} />
						</li>
					)}
					style={{maxHeight: 300, overflowY: "auto", marginBottom: 16}}
				/>
				<Form layout="vertical" onFinish={(values) => onFinish(values, passenger.id)}>
					<Form.Item name="content" rules={[{required: true, message: "Vui lòng nhập nhận xét!"}]}>
						<TextArea rows={3} placeholder="Viết nhận xét của bạn..." />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Thêm nhận xét
						</Button>
					</Form.Item>
				</Form>
			</Panel>
		));

	// Sidebar menu items giống TicketManagement
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
			<div className="ticket-container max-w-6xl mx-auto py-6">
				{/* Breadcrumb */}
				<div className="bread-cump mb-6">
					<Breadcrumb className="text-[20px] font-semibold flex items-center gap-2">
						<Breadcrumb.Item>
							<HomeOutlined className="text-[28px]" />
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<MessageOutlined className="text-[28px]" />
							<span className="text-[20px] ml-2">Nhận xét của tôi</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>

				{/* Main layout */}
				<div className="ticket_management">
					<div className="grid grid-cols-12 gap-5">
						{/* Sidebar menu (giống TicketManagement) */}
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
								<div style={{display: "flex", flexDirection: "column", height: "100%"}}>
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

						{/* Comment section */}
						<div className="col-span-8">
							<Collapse onChange={handleCollapseChange} accordion>
								{renderCommentPanels()}
							</Collapse>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
