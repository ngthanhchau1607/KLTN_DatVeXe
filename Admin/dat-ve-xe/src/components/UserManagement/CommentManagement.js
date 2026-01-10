import React, {useEffect, useState} from "react";
import "../../Sass/css/ticket.css";
import {Breadcrumb, Card, Collapse, Comment, List, Input, message, Rate, Modal} from "antd";
import {useSelector} from "react-redux";
import {HomeOutlined, MessageOutlined} from "@ant-design/icons";
import moment from "moment";
import {history} from "../../App";
import axios from "axios";
import {TOKEN, USER_LOGIN} from "../../util/settings/config";

const {Panel} = Collapse;

export default function CommentManagement() {
	const {userLogin} = useSelector((state) => state.userReducer);

	const [comments, setComments] = useState([]);
	const [rates, setRates] = useState([]);
	const [filteredComments, setFilteredComments] = useState([]);

	// UI state
	const [editingComment, setEditingComment] = useState(null);
	const [editedContent, setEditedContent] = useState("");
	const [editedRate, setEditedRate] = useState(0);
	const [editedRateId, setEditedRateId] = useState(null); // <-- thêm state lưu id rate

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [commentRes, rateRes] = await Promise.all([axios.get("http://localhost:8000/api/v1/comment"), axios.get("http://localhost:8000/api/v1/rate")]);

				setComments(commentRes.data);
				setRates(rateRes.data);
			} catch (error) {
				message.error("Lỗi khi tải nhận xét hoặc đánh giá: " + error.message);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const filtered = comments.filter((comment) => {
			return comment.userId === userLogin.id && rates.some((rate) => rate.userId === comment.userId && rate.passengerId === comment.passengerId);
		});

		setFilteredComments(filtered);
	}, [comments, rates, userLogin.id]);

	// Sửa comment
	const handleEditComment = (commentItem) => {
		const userRate = rates.find((rate) => rate.userId === commentItem.userId && rate.passengerId === commentItem.passengerId);
		setEditingComment(commentItem);
		setEditedContent(commentItem.content);
		setEditedRate(userRate?.numberRate || 0);
		setEditedRateId(userRate?.id || null); // <-- lấy id rate
	};

	const handleSaveEdit = async (item) => {
		try {
			// 1. Gọi API cập nhật rate
			if (editedRateId) {
				await axios.put(`http://localhost:8000/api/v1/rate/${editedRateId}`, {
					numberRate: editedRate,
				});
				console.log("✅ Đã cập nhật rate:", editedRateId);
			}

			// 2. Gọi API cập nhật comment
			await axios.put(`http://localhost:8000/api/v1/comment/${item.id}`, {
				content: editedContent,
			});
			console.log("✅ Đã cập nhật comment:", item.id);

			message.success("Cập nhật thành công!");

			const [commentRes, rateRes] = await Promise.all([axios.get("http://localhost:8000/api/v1/comment"), axios.get("http://localhost:8000/api/v1/rate")]);
			setComments(commentRes.data);
			setRates(rateRes.data);

			// Reset UI
			setEditingComment(null);
			setEditedRateId(null);
		} catch (error) {
			console.error("❌ Lỗi khi cập nhật:", error);
			message.error("Đã xảy ra lỗi khi cập nhật.");
		}
	};

	// Xóa comment
	const handleDeleteComment = (commentId) => {
		const comment = comments.find((c) => c.id === commentId);
		if (!comment) return;

		const rate = rates.find((r) => r.userId === comment.userId && r.passengerId === comment.passengerId);

		Modal.confirm({
			title: "Xác nhận xóa",
			content: "Bạn có chắc chắn muốn xóa đánh giá và bình luận này không?",
			okText: "Xóa",
			okType: "danger",
			cancelText: "Hủy",
			onOk: async () => {
				try {
					// Xóa comment
					await axios.delete(`http://localhost:8000/api/v1/comment/${comment.id}`);
					console.log("✅ Đã xóa comment:", comment.id);

					// Xóa rate nếu có
					if (rate?.id) {
						await axios.delete(`http://localhost:8000/api/v1/rate/${rate.id}`);
						console.log("✅ Đã xóa rate:", rate.id);
					}

					message.success("Đã xóa đánh giá và bình luận");

					// Cập nhật lại danh sách
					const [commentRes, rateRes] = await Promise.all([axios.get("http://localhost:8000/api/v1/comment"), axios.get("http://localhost:8000/api/v1/rate")]);
					setComments(commentRes.data);
					setRates(rateRes.data);
				} catch (error) {
					console.error("❌ Lỗi khi xóa:", error);
					message.error("Đã xảy ra lỗi khi xóa.");
				}
			},
		});
	};

	// Nhóm comment theo passenger
	const groupedByPassenger = filteredComments.reduce((acc, comment) => {
		const passengerId = comment.passengerId;
		if (!acc[passengerId]) {
			acc[passengerId] = {
				passenger: comment.passengerComment,
				comments: [],
			};
		}
		acc[passengerId].comments.push(comment);
		return acc;
	}, {});

	// Render comment panels
	const renderCommentPanels = () => {
		return Object.entries(groupedByPassenger).map(([passengerId, group]) => (
			<Panel header={`Nhà xe ${group.passenger.name}`} key={passengerId}>
				<List
					className="comment-list"
					itemLayout="horizontal"
					dataSource={group.comments}
					locale={{emptyText: "Chưa có nhận xét nào."}}
					renderItem={(item) => {
						const userRate = rates.find((rate) => rate.userId === item.userId && rate.passengerId === item.passengerId);

						const isEditing = editingComment?.id === item.id;

						return (
							<li key={item.id}>
								<Comment
									author={item.userComment?.name}
									avatar={
										<img
											src={item.userComment?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
											alt="avatar"
											style={{
												width: 40,
												height: 40,
												borderRadius: "50%",
												objectFit: "cover",
											}}
										/>
									}
									content={
										isEditing ? (
											<div>
												<Input.TextArea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} rows={3} style={{marginBottom: 8}} />
												<Rate value={editedRate} onChange={setEditedRate} />
												<div style={{marginTop: 8}}>
													<button
														onClick={() => handleSaveEdit(item)}
														style={{
															marginRight: 8,
															color: "white",
															backgroundColor: "#1890ff",
															padding: "4px 12px",
															borderRadius: 4,
														}}
													>
														Lưu
													</button>
													<button
														onClick={() => setEditingComment(null)}
														style={{
															color: "#999",
															padding: "4px 12px",
															borderRadius: 4,
														}}
													>
														Hủy
													</button>
												</div>
											</div>
										) : (
											<div>
												{userRate && (
													<div style={{marginBottom: 4}}>
														<Rate disabled allowHalf value={userRate.numberRate} />
													</div>
												)}
												<div>{item.content}</div>
											</div>
										)
									}
									actions={
										isEditing
											? []
											: [
													<span onClick={() => handleEditComment(item)} style={{color: "#1890ff"}}>
														Sửa
													</span>,
													<span onClick={() => handleDeleteComment(item.id)} style={{color: "red"}}>
														Xóa
													</span>,
											  ]
									}
									datetime={moment(item.createdAt).fromNow()}
								/>
							</li>
						);
					}}
				/>
			</Panel>
		));
	};

	// Sidebar menu
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
			onClick: () => history.push("/changepassword"),
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
						{/* Sidebar */}
						<div className="col-span-4">
							<Card style={{width: "100%", height: "100%", minHeight: "300px"}}>
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

						{/* Comment Section */}
						<div className="col-span-8">
							<Collapse accordion>{renderCommentPanels()}</Collapse>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
