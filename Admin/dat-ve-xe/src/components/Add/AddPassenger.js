import React, {useEffect, useRef, useState} from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, TimePicker, Tag} from "antd";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getDetailTripPassengerAction, updateTripPassengerAction} from "../../redux/actions/tripAction";
import moment from "moment";
import _ from "lodash";
import {createPassenger, getDetailPassenger, updateImagePassengerAction, updatePassengerAction} from "../../redux/actions/passengerAction";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";
const {Option} = Select;

export default function AddPassenger(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const [previewImage, setPreviewImage] = useState(null);
	// Trong component AddPassenger:
	const fileInputRef = useRef(null); // tạo ref cho input file

	// Hàm reset ảnh
	const resetImage = () => {
		formik.setFieldValue("file", ""); // reset giá trị file trong formik
		setPreviewImage(null); // reset ảnh preview
		if (fileInputRef.current) {
			fileInputRef.current.value = null; // reset DOM input file
		}
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: "",
			confirmType: "",
			price: "",
			imageIntro: "",
			description: "",
			numberVehicle: "",
			file: "",
		},

		onSubmit: (values, {resetForm}) => {
			var bodyFormData = new FormData();
			bodyFormData.append("passenger", values.file);
			let passenger = {
				name: values.name,
				confirmType: values.confirmType,
				price: values.price,
				description: values.description,
			};
			dispatch(createPassenger(passenger, bodyFormData));

			// ✅ Reset form + ảnh preview
			// Reset từng field về "" bằng tay
			formik.setFieldValue("name", "");
			formik.setFieldValue("confirmType", "");
			formik.setFieldValue("price", "");
			formik.setFieldValue("imageIntro", "");
			formik.setFieldValue("description", "");
			formik.setFieldValue("numberVehicle", "");
			formik.setFieldValue("file", "");
			resetImage(); // gọi reset ảnh

			setPreviewImage(null);

			dispatch({type: CLOSE_DRAWER});
		},
	});
	const handleChange = (name) => {
		return (e) => {
			formik.setFieldValue(name, e.target.value);
		};
	};
	const handleChangeSelect = (name) => {
		return (value) => {
			formik.setFieldValue(name, value);
		};
	};
	const handleChangeFile = (e) => {
		let file = e.target.files[0];

		if (file) {
			formik.setFieldValue("file", file);

			// ✅ Tạo URL xem trước ảnh
			const previewUrl = URL.createObjectURL(file);
			setPreviewImage(previewUrl);
		}
	};
	return (
		<Form layout="vertical" name="basic" autoComplete="off">
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Tên Nhà Xe">
						<Input placeholder="Please enter passenger name" name="name" onChange={handleChange("name")} value={formik.values.name} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Hình Ảnh">
						<Input style={{width: "100%"}} type="file" onChange={handleChangeFile} ref={fileInputRef} />
						{previewImage && <img src={previewImage} alt="preview" width={75} height={75} style={{border: "1px solid #ccc", borderRadius: 4, marginTop: 10}} />}
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={16}>
					<Form.Item label="Giá">
						<Input style={{width: "100%"}} type="number" placeholder="Giá" onChange={handleChange("price")} value={formik.values.price} />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item
						label="Mô Tả"
						rules={[
							{
								required: true,
								message: "please enter url description",
							},
						]}
					>
						<Input.TextArea rows={4} name="description" placeholder="please enter url description" onChange={handleChange("description")} value={formik.values.description} />
					</Form.Item>
				</Col>
			</Row>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					onClick={() => {
						formik.handleSubmit();
					}}
				>
					Thêm
				</Button>
			</Form.Item>
		</Form>
	);
}
