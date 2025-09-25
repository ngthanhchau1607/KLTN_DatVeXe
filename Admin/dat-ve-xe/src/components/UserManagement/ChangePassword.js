import React from "react";
import {Breadcrumb, Card, Form, Input, Button, message} from "antd";
import {HomeOutlined, LockOutlined} from "@ant-design/icons";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../App";
import "../../Sass/css/user.css";
import axios from "axios";

export default function ChangePassword() {
	const dispatch = useDispatch();
	const {userLogin} = useSelector((state) => state.userReducer);

	// Validation schema
	const ChangePassSchema = Yup.object().shape({
		oldPassword: Yup.string().required("Vui lòng nhập mật khẩu cũ"),
		newPassword: Yup.string().min(6, "Mật khẩu phải ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu mới"),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
			.required("Vui lòng xác nhận mật khẩu"),
	});

	const formik = useFormik({
		initialValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: ChangePassSchema,
		onSubmit: async (values) => {
			try {
				const userId = userLogin?.id; // lấy id user từ redux

				if (!userId) {
					message.error("Không tìm thấy thông tin người dùng.");
					return;
				}

				const response = await axios.put(`http://localhost:8000/api/v1/users/change/${userId}`, {
					oldPassword: values.oldPassword,
					newPassword: values.newPassword,
				});

				message.success("Đổi mật khẩu thành công!");
				formik.resetForm();
			} catch (error) {
				console.error(error);
				message.error(error.response?.data?.message || "Đổi mật khẩu thất bại!");
			}
		},
		validateOnBlur: false, // 👈 Chỉ kiểm tra khi submit
		validateOnChange: false, // 👈 Không kiểm tra khi đang nhập
	});

	return (
		<div className="user">
			<div className="user-container">
				{/* Breadcrumb */}
				<div className="bread-cump mb-6 mt-6">
					<Breadcrumb className="text-[20px] font-semibold flex items-center gap-2">
						<Breadcrumb.Item>
							<HomeOutlined className="text-[28px]" />
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<LockOutlined className="text-[28px]" />
							<span className="text-[20px] ml-2">Đổi mật khẩu</span>
						</Breadcrumb.Item>
					</Breadcrumb>
				</div>

				<div className="ticket_management">
					<div className="grid grid-cols-12 gap-5">
						{/* Sidebar */}
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
									{[
										{
											label: "Thông tin cá nhân",
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
												localStorage.removeItem("USER_LOGIN");
												localStorage.removeItem("TOKEN");
												window.location.reload();
											},
										},
									].map((item, index, array) => (
										<div
											key={index}
											style={{
												flex: 1,
												display: "flex",
												alignItems: "center",
												cursor: "pointer",
												padding: "16px",
												borderBottom: index !== array.length - 1 ? "1px solid #f0f0f0" : "none",
											}}
											onClick={item.onClick}
										>
											<img src={item.icon} width={24} height={16} alt={item.label} />
											<span style={{fontSize: "18px", marginLeft: 10}}>{item.label}</span>
										</div>
									))}
								</div>
							</Card>
						</div>

						{/* Form section */}
						<div className="col-span-8">
							<div className="title font-bold text-xl mb-4">Đổi mật khẩu</div>
							<Form layout="vertical" onFinish={formik.handleSubmit} autoComplete="off">
								<Form.Item label="Mật khẩu cũ" required>
									<Input.Password name="currentPass" onChange={(e) => formik.setFieldValue("oldPassword", e.target.value)} value={formik.values.oldPassword} />
									{formik.errors.oldPassword && <p className="text-red-500 text-xs italic">{formik.errors.oldPassword}</p>}
								</Form.Item>

								<Form.Item label="Mật khẩu mới" required>
									<Input.Password name="newPassField" autoComplete="new-password" onChange={(e) => formik.setFieldValue("newPassword", e.target.value)} value={formik.values.newPassword} />
									{formik.errors.newPassword && <p className="text-red-500 text-xs italic">{formik.errors.newPassword}</p>}
								</Form.Item>

								<Form.Item label="Xác nhận mật khẩu mới" required>
									<Input.Password name="confirmNewPass" autoComplete="new-password" onChange={(e) => formik.setFieldValue("confirmPassword", e.target.value)} value={formik.values.confirmPassword} />
									{formik.errors.confirmPassword && <p className="text-red-500 text-xs italic">{formik.errors.confirmPassword}</p>}
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit">
										Đổi mật khẩu
									</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
