import React, {useEffect, useState} from "react";
import {Form, Button, Col, Row, Input, Select, DatePicker, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getAllPassenger} from "../../redux/actions/passengerAction";
import axios from "axios";
import moment from "moment";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";

const {Option} = Select;

export default function AddVoucher({onSuccess}) {
	const dispatch = useDispatch();
	const {listPassenger} = useSelector((state) => state.PassengerReducer);

	const [formState, setFormState] = useState({
		code: "",
		startTime: null,
		endTime: null,
		discountValue: "",
		passengerId: null,
	});

	useEffect(() => {
		dispatch(getAllPassenger());
	}, []);

	// Render danh sách nhà xe
	const renderPassenger = () => {
		const allOption = {label: "Tất cả nhà xe", value: null};
		const passengerOptions = listPassenger.map((item) => ({
			label: item.name,
			value: item.id,
		}));
		return [allOption, ...passengerOptions];
	};

	const handleChange = (name) => (e) => {
		setFormState({...formState, [name]: e.target.value});
	};

	const handleChangeSelect = (name) => (value) => {
		setFormState({...formState, [name]: value});
	};

	const handleChangeDate = (name) => (value) => {
		setFormState({...formState, [name]: value});
	};

	const handleSubmit = async () => {
		try {
			const payload = {
				...formState,
				startTime: formState.startTime ? formState.startTime.toISOString() : null,
				endTime: formState.endTime ? formState.endTime.toISOString() : null,
			};

			await axios.post("http://localhost:8000/api/v1/voucher", payload);

			message.success(" Tạo voucher thành công!");

			if (onSuccess) onSuccess();

			dispatch({type: CLOSE_DRAWER});

			// Reset form
			setFormState({
				code: "",
				startTime: null,
				endTime: null,
				discountValue: "",
				passengerId: null,
			});
		} catch (error) {
			console.error(error);
			const errMsg = error.response?.data?.message || "Đã xảy ra lỗi khi tạo voucher.";
			message.error(`❌ ${errMsg}`);
		}
	};

	return (
		<Form layout="vertical" onFinish={handleSubmit}>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Mã Voucher" required>
						<Input placeholder="Nhập mã voucher" value={formState.code} onChange={handleChange("code")} />
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item label="Giảm (%)" required>
						<Input type="number" min={1} max={100} placeholder="Giảm bao nhiêu %" value={formState.discountValue} onChange={handleChange("discountValue")} />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label="Thời gian bắt đầu" required>
						<DatePicker style={{width: "100%"}} showTime format="YYYY-MM-DD HH:mm" value={formState.startTime} onChange={handleChangeDate("startTime")} />
					</Form.Item>
				</Col>

				<Col span={12}>
					<Form.Item label="Thời gian kết thúc" required>
						<DatePicker style={{width: "100%"}} showTime format="YYYY-MM-DD HH:mm" value={formState.endTime} onChange={handleChangeDate("endTime")} />
					</Form.Item>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={24}>
					<Form.Item label="Nhà xe áp dụng">
						<Select allowClear showSearch placeholder="Chọn nhà xe (nếu có)" options={renderPassenger()} value={formState.passengerId} onChange={handleChangeSelect("passengerId")} />
					</Form.Item>
				</Col>
			</Row>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Tạo Voucher
				</Button>
			</Form.Item>
		</Form>
	);
}
