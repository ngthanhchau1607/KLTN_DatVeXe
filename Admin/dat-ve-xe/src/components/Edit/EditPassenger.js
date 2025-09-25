import React, {useEffect} from "react";
import {Form, Input, Button, Col, Row} from "antd";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getDetailPassenger, updateImagePassengerAction, updatePassengerAction} from "../../redux/actions/passengerAction";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";

export default function EditPassenger(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const {passengerDetail} = useSelector((state) => state.PassengerReducer);

	useEffect(() => {
		dispatch(getDetailPassenger(id));
	}, [id]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: passengerDetail.name || "",
			price: passengerDetail.price || 0,
			imageIntro: passengerDetail.imageIntro || "",
			description: passengerDetail.description || "",
			numberVehicle: passengerDetail.passengerCar?.length || 0,
			file: null,
		},
		onSubmit: (values) => {
			const passengerUpdate = {
				name: values.name,
				price: values.price,
				description: values.description,
			};

			const bodyFormData = new FormData();
			if (values.file) {
				bodyFormData.append("passenger", values.file);
			}

			dispatch(updatePassengerAction(passengerUpdate, passengerDetail.id));

			if (values.file) {
				dispatch(updateImagePassengerAction(passengerDetail.id, bodyFormData));
			}

			dispatch({type: CLOSE_DRAWER});
		},
	});

	const handleChange = (name) => (e) => {
		formik.setFieldValue(name, e.target.value);
	};

	const handleChangeFile = (e) => {
		const file = e.target.files[0];
		formik.setFieldValue("file", file);
	};

	return (
		<Form layout="vertical" onFinish={formik.handleSubmit}>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Tên Nhà Xe">
						<Input placeholder="Nhập tên nhà xe" name="name" value={formik.values.name} onChange={handleChange("name")} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Số Xe">
						<Input disabled name="numberVehicle" value={formik.values.numberVehicle} />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Giá">
						<Input type="number" placeholder="Nhập giá" value={formik.values.price} onChange={handleChange("price")} />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label="Hình Ảnh">
						<Input type="file" onChange={handleChangeFile} />
						{formik.values.imageIntro && <img src={formik.values.imageIntro} alt="preview" width={75} height={75} style={{marginTop: 8}} />}
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={24}>
					<Form.Item label="Mô Tả">
						<Input.TextArea rows={4} name="description" value={formik.values.description} onChange={handleChange("description")} placeholder="Nhập mô tả" />
					</Form.Item>
				</Col>
			</Row>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Cập Nhật
				</Button>
			</Form.Item>
		</Form>
	);
}
