import React, {useState} from "react";
import {Form, Input, Button, message} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {DOMAIN, TOKEN} from "../../util/settings/config";
import {useDispatch} from "react-redux";
import axios from "axios";

import {registerAction} from "../../redux/actions/UserAction";

export default function Register(props) {
	const dispatch = useDispatch();

	const [isOTPSent, setIsOTPSent] = useState(false);
	const [otpFromServer, setOtpFromServer] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// Form nhập thông tin đăng ký
	const signupFormik = useFormik({
		initialValues: {
			name: "",
			phone: "",
			email: "",
			passWord: "",
			confirmPassword: "",
			otp: "",
		},
		validationSchema: Yup.object().shape({
			name: Yup.string().min(2, "Tên quá ngắn!").max(50, "Tên quá dài!").required("Vui lòng nhập tên"),
			phone: Yup.string()
				.required("Không được bỏ trống số điện thoại")
				.matches(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/, "Số điện thoại không hợp lệ"),
			email: Yup.string().min(2, "Email quá ngắn!").max(50, "Email quá dài!").email("Email không hợp lệ").required("Vui lòng nhập email"),
			passWord: Yup.string().min(6, "Password quá ngắn!").max(50, "Password quá dài!").required("Vui lòng nhập password"),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref("passWord"), null], "Mật khẩu không trùng")
				.required("Vui lòng xác nhận mật khẩu"),
			otp: isOTPSent
				? Yup.string()
						.matches(/^\d{4}$/, "Mã OTP phải gồm 4 chữ số")
						.required("Vui lòng nhập mã OTP")
				: Yup.string().notRequired(),
		}),
		validateOnChange: false, // tắt validate khi nhập
		validateOnBlur: false, // tắt validate khi blur
		onSubmit: async (values) => {
			if (!isOTPSent) {
				// Gửi OTP lên server
				try {
					setIsLoading(true);
					const response = await axios.post(`${DOMAIN}users/otp`, {
						email: values.email,
					});

					message.success("Mã OTP đã được gửi đến email của bạn!");
					setOtpFromServer(response.data.otp);
					setIsOTPSent(true);
				} catch (error) {
					const msg = error.response?.data?.message || "Gửi OTP thất bại!";
					message.error(msg);
				} finally {
					setIsLoading(false);
				}
			} else {
				// Xác nhận OTP
				if (values.otp === String(otpFromServer)) {
					try {
						setIsLoading(true);
						const user = {
							name: values.name,
							email: values.email,
							password: values.passWord,
							numberPhone: values.phone,
						};
						await dispatch(registerAction(user));

						props.setToggle(false); // Đóng modal đăng ký
						signupFormik.resetForm();
						setIsOTPSent(false);
						setOtpFromServer(null);
					} catch (error) {
						const msg = error.response?.data?.message || "Đăng ký thất bại!";
						message.error(msg);
					} finally {
						setIsLoading(false);
					}
				} else {
					message.error("Mã OTP không đúng!");
				}
			}
		},
	});

	return (
		<Form layout="vertical" onFinish={signupFormik.handleSubmit}>
			{!isOTPSent && (
				<>
					<Form.Item label="Tên" required>
						<Input name="name" value={signupFormik.values.name} onChange={(e) => signupFormik.setFieldValue("name", e.target.value)} />
						{signupFormik.submitCount > 0 && signupFormik.errors.name && <p className="text-red-500 text-xs italic">{signupFormik.errors.name}</p>}
					</Form.Item>

					<Form.Item label="Số điện thoại" required>
						<Input name="phone" value={signupFormik.values.phone} onChange={(e) => signupFormik.setFieldValue("phone", e.target.value)} />
						{signupFormik.submitCount > 0 && signupFormik.errors.phone && <p className="text-red-500 text-xs italic">{signupFormik.errors.phone}</p>}
					</Form.Item>

					<Form.Item label="Email" required>
						<Input name="email" value={signupFormik.values.email} onChange={(e) => signupFormik.setFieldValue("email", e.target.value)} />
						{signupFormik.submitCount > 0 && signupFormik.errors.email && <p className="text-red-500 text-xs italic">{signupFormik.errors.email}</p>}
					</Form.Item>

					<Form.Item label="Mật khẩu" required>
						<Input.Password name="passWord" value={signupFormik.values.passWord} onChange={(e) => signupFormik.setFieldValue("passWord", e.target.value)} />
						{signupFormik.submitCount > 0 && signupFormik.errors.passWord && <p className="text-red-500 text-xs italic">{signupFormik.errors.passWord}</p>}
					</Form.Item>

					<Form.Item label="Xác nhận mật khẩu" required>
						<Input.Password name="confirmPassword" value={signupFormik.values.confirmPassword} onChange={(e) => signupFormik.setFieldValue("confirmPassword", e.target.value)} />
						{signupFormik.submitCount > 0 && signupFormik.errors.confirmPassword && <p className="text-red-500 text-xs italic">{signupFormik.errors.confirmPassword}</p>}
					</Form.Item>
				</>
			)}

			{isOTPSent && (
				<Form.Item label="Mã OTP" required>
					<Input maxLength={4} name="otp" value={signupFormik.values.otp} onChange={(e) => signupFormik.setFieldValue("otp", e.target.value)} />
					{signupFormik.submitCount > 0 && signupFormik.errors.otp && <p className="text-red-500 text-xs italic">{signupFormik.errors.otp}</p>}
				</Form.Item>
			)}

			<Form.Item>
				<Button type="primary" htmlType="submit" loading={isLoading} block>
					{isOTPSent ? "Xác nhận OTP & Đăng ký" : "Gửi mã OTP"}
				</Button>
			</Form.Item>

			<div style={{textAlign: "center"}}>
				Nếu đã có tài khoản?{" "}
				<button
					type="button"
					className="ant-btn ant-btn-link ant-btn-sm"
					onClick={() => {
						props.setToggle(!props.toggle);
					}}
				>
					Đăng nhập
				</button>
			</div>
		</Form>
	);
}
