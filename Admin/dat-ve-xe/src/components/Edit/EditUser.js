import React, {useEffect} from "react";
import {Form, Input, Button, Select, message} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

import {getDetailUserAction, getUserAction} from "../../redux/actions/UserAction";
import {HIDE_MODAL} from "../../redux/types/ModalTypes";

const {Option, OptGroup} = Select;

export default function EditUser(props) {
	const dispatch = useDispatch();
	const {detailUser} = useSelector((state) => state.userReducer);

	useEffect(() => {
		dispatch(getDetailUserAction(props.id));
	}, [props.id]);

	const SignupSchema = Yup.object().shape({
		email: Yup.string().min(2, "Email quá ngắn!").max(50, "Email quá dài!").email("Email không hợp lệ").required("Vui lòng nhập email"),
		name: Yup.string().min(2, "Tên quá ngắn!").max(50, "Tên quá dài!").required("Vui lòng nhập tên"),
		passWord: Yup.string().min(2, "Password quá ngắn!").max(50, "Password quá dài!"),
		numberPhone: Yup.string()
			.required("Không được bỏ trống số điện thoại")
			.matches(/^[0-9]{9,12}$/, "Số điện thoại không hợp lệ"),
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: detailUser.name || "",
			numberPhone: detailUser.numberPhone || "",
			email: detailUser.email || "",
			type: detailUser.type || "",
		},
		validationSchema: SignupSchema,
		onSubmit: async (values) => {
			try {
				const payload = {
					name: values.name,
					numberPhone: values.numberPhone,
				};

				const response = await axios.put(`http://localhost:8000/api/v1/users/update/${props.id}`, payload);

				console.log("✅ Cập nhật thành công:", response.data);

				// Gọi lại danh sách user mới
				dispatch(getUserAction());

				// Đóng modal
				dispatch({type: HIDE_MODAL});

				// Hiển thị thông báo
				message.success("Cập nhật thành công");
			} catch (error) {
				console.error("❌ Lỗi khi cập nhật user:", error.response?.data || error.message);
				message.error("Cập nhật thất bại");
			}
		},
	});

	const handleChangeOpt = (value) => {
		formik.setFieldValue("type", value);
	};

	return (
		<Form name="basic" autoComplete="off">
			<Form.Item label="Tên" name="name">
				<Input onChange={(e) => formik.setFieldValue("name", e.target.value)} name="name" value={formik.values.name} />
				<p className="text-red-500 text-xs italic mb-0">{formik.errors.name}</p>
			</Form.Item>

			<Form.Item label="Số điện thoại" name="numberPhone">
				<Input onChange={(e) => formik.setFieldValue("numberPhone", e.target.value)} name="numberPhone" value={formik.values.numberPhone} />
				<p className="text-red-500 text-xs italic mb-0">{formik.errors.numberPhone}</p>
			</Form.Item>

			<Form.Item label="Email" name="email">
				<Input disabled style={{backgroundColor: "#f5f5f5", color: "#555"}} name="email" value={formik.values.email} />
				<p className="text-red-500 text-xs italic mb-0">{formik.errors.email}</p>
			</Form.Item>

			<Select disabled style={{backgroundColor: "#f5f5f5", color: "#555", width: 200, marginBottom: 15}} value={formik.values.type} onChange={handleChangeOpt}>
				<OptGroup label="Loại người dùng">
					<Option value="CLIENT">CLIENT</Option>
					<Option value="ADMIN">ADMIN</Option>
				</OptGroup>
			</Select>

			<Form.Item wrapperCol={{offset: 8, span: 8}}>
				<Button type="primary" onClick={formik.handleSubmit}>
					Cập Nhật
				</Button>
			</Form.Item>
		</Form>
	);
}
