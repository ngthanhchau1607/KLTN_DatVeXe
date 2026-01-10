import React, {useState, useEffect} from "react";
import {Form, Input, Button, Checkbox, message} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {LoginAction} from "../../redux/actions/UserAction";
import {DOMAIN, TOKEN} from "../../util/settings/config";
import axios from "axios";

export default function Login(props) {
	const dispatch = useDispatch();

	// State điều khiển giao diện & trạng thái
	const [isForgotPassword, setIsForgotPassword] = useState(false);
	const [isOTPSent, setIsOTPSent] = useState(false);
	const [emailForReset, setEmailForReset] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isResetPassword, setIsResetPassword] = useState(false);
	const [otpFromServer, setOtpFromServer] = useState(null);

	// ======= LOGIN FORM =======
	const loginFormik = useFormik({
		initialValues: {
			email: "",
			passWord: "",
			rememberMe: false,
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().min(2, "Email quá ngắn!").max(50, "Email quá dài!").email("Email không hợp lệ").required("Vui lòng nhập email"),
			passWord: Yup.string().min(2, "Mật khẩu quá ngắn!").max(50, "Mật khẩu quá dài!").required("Vui lòng nhập mật khẩu"),
		}),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: (values) => {
			const user = {
				email: values.email,
				password: values.passWord,
			};

			// Lưu email nếu có tick "Ghi nhớ"
			if (values.rememberMe) {
				localStorage.setItem("rememberedEmail", values.email);
			} else {
				localStorage.removeItem("rememberedEmail");
			}

			dispatch(LoginAction(user));
			props.setModal(false);
		},
	});

	// ======= REMEMBER ME - LẤY TỪ LOCAL STORAGE =======
	useEffect(() => {
		const rememberedEmail = localStorage.getItem("rememberedEmail");
		if (rememberedEmail) {
			loginFormik.setFieldValue("email", rememberedEmail);
			loginFormik.setFieldValue("rememberMe", true);
		}
	}, []);

	// ======= FORGOT PASSWORD FORM =======
	const forgotFormik = useFormik({
		initialValues: {
			email: "",
			otp: "",
		},
		validationSchema: Yup.object().shape({
			email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email để khôi phục mật khẩu"),
			otp: isOTPSent
				? Yup.string()
						.matches(/^\d{4}$/, "Mã OTP phải gồm 4 chữ số")
						.required("Vui lòng nhập mã OTP")
				: Yup.string().notRequired(),
		}),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			if (!isOTPSent) {
				try {
					setIsLoading(true);
					const response = await axios.post(`${DOMAIN}users/otp`, {
						email: values.email,
					});
					message.success("Mã OTP đã được gửi đến email của bạn!");
					setEmailForReset(values.email);
					setIsOTPSent(true);
					setOtpFromServer(response.data.otp);
				} catch (error) {
					const msg = error.response?.data?.message || "Gửi OTP thất bại!";
					message.error(msg);
				} finally {
					setIsLoading(false);
				}
			} else {
				if (values.otp === String(otpFromServer)) {
					message.success("Xác minh OTP thành công. Vui lòng nhập mật khẩu mới.");
					setIsResetPassword(true);
				} else {
					message.error("Mã OTP không đúng!");
				}
			}
		},
	});

	// ======= NEW PASSWORD FORM =======
	const newPasswordFormik = useFormik({
		initialValues: {
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object().shape({
			newPassword: Yup.string().min(6, "Mật khẩu mới phải ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu mới"),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
				.required("Vui lòng xác nhận mật khẩu mới"),
		}),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			try {
				setIsLoading(true);
				await axios.post(`${DOMAIN}users/reset-password`, {
					email: emailForReset,
					newPassword: values.newPassword,
				});
				message.success("Đổi mật khẩu thành công! Bạn có thể đăng nhập lại.");
				setIsForgotPassword(false);
				setIsOTPSent(false);
				setIsResetPassword(false);
				setEmailForReset("");
				setOtpFromServer(null);
				newPasswordFormik.resetForm();
				forgotFormik.resetForm();
			} catch (error) {
				const msg = error.response?.data?.message || "Đổi mật khẩu thất bại!";
				message.error(msg);
			} finally {
				setIsLoading(false);
			}
		},
	});

	// ======= RENDER QUÊN MẬT KHẨU =======
	const renderForgotPasswordForm = () => {
		if (isResetPassword) {
			return (
				<Form layout="vertical" onFinish={newPasswordFormik.handleSubmit}>
					<Form.Item label="Mật khẩu mới" required>
						<Input.Password name="newPassword" value={newPasswordFormik.values.newPassword} onChange={(e) => newPasswordFormik.setFieldValue("newPassword", e.target.value)} />
						{newPasswordFormik.submitCount > 0 && newPasswordFormik.errors.newPassword && <p className="text-red-500 text-xs italic">{newPasswordFormik.errors.newPassword}</p>}
					</Form.Item>

					<Form.Item label="Xác nhận mật khẩu mới" required>
						<Input.Password name="confirmPassword" value={newPasswordFormik.values.confirmPassword} onChange={(e) => newPasswordFormik.setFieldValue("confirmPassword", e.target.value)} />
						{newPasswordFormik.submitCount > 0 && newPasswordFormik.errors.confirmPassword && <p className="text-red-500 text-xs italic">{newPasswordFormik.errors.confirmPassword}</p>}
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit" block loading={isLoading}>
							Đổi mật khẩu
						</Button>
					</Form.Item>

					<div style={{textAlign: "center"}}>
						<button
							type="button"
							className="ant-btn ant-btn-link ant-btn-sm"
							onClick={() => {
								setIsForgotPassword(false);
								setIsOTPSent(false);
								setIsResetPassword(false);
								setEmailForReset("");
								setOtpFromServer(null);
								newPasswordFormik.resetForm();
								forgotFormik.resetForm();
							}}
						>
							Quay lại đăng nhập
						</button>
					</div>
				</Form>
			);
		}

		return (
			<Form name="forgot" layout="vertical" onFinish={forgotFormik.handleSubmit}>
				{!isOTPSent && (
					<Form.Item label="Email" required>
						<Input name="email" value={forgotFormik.values.email} onChange={(e) => forgotFormik.setFieldValue("email", e.target.value)} />
						{forgotFormik.submitCount > 0 && forgotFormik.errors.email && <p className="text-red-500 text-xs italic">{forgotFormik.errors.email}</p>}
					</Form.Item>
				)}

				{isOTPSent && (
					<Form.Item label="Mã OTP" required>
						<Input name="otp" maxLength={4} value={forgotFormik.values.otp} onChange={(e) => forgotFormik.setFieldValue("otp", e.target.value)} />
						{forgotFormik.submitCount > 0 && forgotFormik.errors.otp && <p className="text-red-500 text-xs italic">{forgotFormik.errors.otp}</p>}
					</Form.Item>
				)}

				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={isLoading}>
						{isOTPSent ? "Xác minh mã OTP" : "Gửi yêu cầu khôi phục"}
					</Button>
				</Form.Item>

				<div style={{textAlign: "center"}}>
					<button
						type="button"
						className="ant-btn ant-btn-link ant-btn-sm"
						onClick={() => {
							setIsForgotPassword(false);
							setIsOTPSent(false);
							setIsResetPassword(false);
							setEmailForReset("");
							setOtpFromServer(null);
							forgotFormik.resetForm();
						}}
					>
						Quay lại đăng nhập
					</button>
				</div>
			</Form>
		);
	};

	// ======= RENDER FORM ĐĂNG NHẬP =======
	const renderLoginForm = () => (
		<Form name="login" autoComplete="off" onFinish={loginFormik.handleSubmit}>
			<Form.Item label="Email" name="email" required>
				<Input onChange={(e) => loginFormik.setFieldValue("email", e.target.value)} name="email" value={loginFormik.values.email} />
				{loginFormik.submitCount > 0 && loginFormik.errors.email && <p className="text-red-500 text-xs italic mb-0">{loginFormik.errors.email}</p>}
			</Form.Item>

			<Form.Item label="Mật khẩu" name="passWord" required>
				<Input.Password onChange={(e) => loginFormik.setFieldValue("passWord", e.target.value)} name="passWord" value={loginFormik.values.passWord} />
				{loginFormik.submitCount > 0 && loginFormik.errors.passWord && <p className="text-red-500 text-xs italic mb-0">{loginFormik.errors.passWord}</p>}
			</Form.Item>

			<Form.Item>
				<div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
					{/* <Checkbox checked={loginFormik.values.rememberMe} onChange={(e) => loginFormik.setFieldValue("rememberMe", e.target.checked)}>
						Ghi nhớ
					</Checkbox> */}
					<button type="button" className="ant-btn ant-btn-link ant-btn-sm" style={{padding: 0, marginLeft: "auto"}} onClick={() => setIsForgotPassword(true)}>
						Quên mật khẩu?
					</button>
				</div>
			</Form.Item>

			<Form.Item wrapperCol={{offset: 8, span: 8}}>
				<Button type="primary" htmlType="submit">
					Đăng nhập
				</Button>
			</Form.Item>

			<div>
				Bạn chưa có tài khoản?
				<button type="button" className="ant-btn ant-btn-link ant-btn-sm" onClick={() => props.setToggle(!props.toggle)}>
					<span>Đăng ký</span>
				</button>
			</div>
		</Form>
	);

	// ======= RENDER ==========
	return <>{isForgotPassword ? renderForgotPasswordForm() : renderLoginForm()}</>;
}
