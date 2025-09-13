import React from "react";
import {Form, Input, Button, message} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";

export default function ForgotPasswordForm({onBackToLogin}) {
	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
		}),
		onSubmit: async (values, {resetForm}) => {
			try {
				// 👉 TODO: Gọi API quên mật khẩu tại đây
				/*
        await fetch("http://localhost:8000/api/v1/users/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: values.email }),
        });
        */

				message.success("Yêu cầu khôi phục mật khẩu đã được gửi.");
				resetForm();
				onBackToLogin(); // quay về login sau khi gửi
			} catch (error) {
				message.error("Gửi yêu cầu thất bại. Vui lòng thử lại.");
			}
		},
	});

	return (
		<Form layout="vertical" onFinish={formik.handleSubmit}>
			<Form.Item label="Email">
				<Input name="email" onChange={(e) => formik.setFieldValue("email", e.target.value)} value={formik.values.email} />
				{formik.errors.email && <p className="text-red-500 text-xs italic">{formik.errors.email}</p>}
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" block>
					Gửi yêu cầu
				</Button>
			</Form.Item>

			<div style={{textAlign: "center"}}>
				<button type="button" className="ant-btn ant-btn-link ant-btn-sm" onClick={onBackToLogin}>
					Quay lại đăng nhập
				</button>
			</div>
		</Form>
	);
}
