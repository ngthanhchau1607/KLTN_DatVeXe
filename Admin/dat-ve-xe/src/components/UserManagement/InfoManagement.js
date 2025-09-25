import React, {useEffect} from "react";
import "../../Sass/css/user.css";
import {Breadcrumb, Card, Form, Input, Button} from "antd";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {history} from "../../App";
import {TOKEN, USER_LOGIN} from "../../util/settings/config";
import * as Yup from "yup";
import {useFormik} from "formik";
import {UpdatelUserAction} from "../../redux/actions/UserAction";

export default function InfoManagement(props) {
	const dispatch = useDispatch();
	const {userLogin} = useSelector((state) => state.userReducer);

	const layout = {
		labelCol: {span: 24},
		wrapperCol: {span: 24},
	};

	const SignupSchema = Yup.object().shape({
		email: Yup.string().min(2, "Email quá ngắn!").max(50, "Email quá dài!").email("Email không hợp lệ").required("Vui lòng nhập email"),
		name: Yup.string().min(2, "Tên quá ngắn!").max(50, "Tên quá dài!").required("Vui lòng nhập tên"),
		passWord: Yup.string().min(2, "Password quá ngắn!"),
		phone: Yup.string()
			.required("Không được bỏ trống số điện thoại")
			.matches(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/, "Số điện thoại không hợp lệ"),
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: userLogin.name || "",
			phone: userLogin.numberPhone || "",
			email: userLogin.email || "",
			passWord: userLogin.password || "",
			type: userLogin.type || "",
		},
		validationSchema: SignupSchema,
		onSubmit: (values) => {
			const user = {
				name: values.name,
				email: values.email,
				password: values.passWord,
				numberPhone: values.phone,
				type: values.type,
			};
			dispatch(UpdatelUserAction(user, userLogin.id));
		},
	});

	return (
		<div className="user">
			<div className="user-container">
				{/* Breadcrumb */}
				<div className="bread-cump mb-6 mt-6">
					<Breadcrumb className="text-[20px] font-semibold flex items-center gap-2">
						<Breadcrumb.Item>
							<HomeOutlined className="text-[28px]" /> {/* Icon Home to hơn */}
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<UserOutlined className="text-[28px]" /> {/* Icon User to hơn */}
							<span className="text-[20px] ml-2">Thông tin cá nhân</span>
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
									padding: 0, // bỏ padding ở đây để không ảnh hưởng đến height tính toán
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										height: "100%",
									}}
								>
									{/* Menu items (bao gồm cả logout để chia đều chiều cao) */}
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
							<div className="title font-bold text-xl mb-4">Thông tin cá nhân</div>
							<Form {...layout} onFinish={formik.handleSubmit}>
								<Form.Item label="Họ tên" required>
									<Input name="name" onChange={formik.handleChange} value={formik.values.name} />
									{formik.errors.name && <p className="text-red-500 text-xs italic">{formik.errors.name}</p>}
								</Form.Item>

								<Form.Item label="Email" required>
									<Input name="email" onChange={formik.handleChange} value={formik.values.email} />
									{formik.errors.email && <p className="text-red-500 text-xs italic">{formik.errors.email}</p>}
								</Form.Item>

								<Form.Item label="Số điện thoại" required>
									<Input name="phone" onChange={formik.handleChange} value={formik.values.phone} />
									{formik.errors.phone && <p className="text-red-500 text-xs italic">{formik.errors.phone}</p>}
								</Form.Item>

								<Form.Item>
									<Button type="primary" htmlType="submit">
										Cập nhật
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
