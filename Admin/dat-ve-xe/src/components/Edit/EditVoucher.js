import React, {useEffect, useState} from "react";
import {Form, Button, Col, Row, Input, Select, DatePicker, message} from "antd";
import moment from "moment";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {DOMAIN, TOKEN} from "../../util/settings/config";
import {CLOSE_DRAWER} from "../../redux/types/DrawerTypes";

export default function EditVoucher({id, onSuccess}) {
	const [formState, setFormState] = useState({
		code: "",
		startTime: null,
		endTime: null,
		discountValue: "",
		passengerId: null,
	});
	const dispatch = useDispatch();

	const {listPassenger} = useSelector((state) => state.PassengerReducer);

	// Gọi API lấy thông tin voucher theo id
	useEffect(() => {
		const fetchVoucher = async () => {
			try {
				const res = await axios.get(`${DOMAIN}voucher/${id}`);
				const data = res.data.data;

				setFormState({
					code: data.code,
					startTime: moment(data.startTime),
					endTime: moment(data.endTime),
					discountValue: data.discountValue,
					passengerId: data.passengerId || null,
				});
			} catch (err) {
				console.error(err);
				message.error("Không thể tải dữ liệu voucher");
			}
		};
		fetchVoucher();
	}, [id]);

	// Thêm option "Tất cả nhà xe" với value null vào danh sách nhà xe lấy từ Redux
	const renderPassenger = () => [
		{label: "Tất cả nhà xe", value: null},
		...listPassenger.map((item) => ({
			label: item.name,
			value: item.id,
		})),
	];

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
				startTime: formState.startTime.toISOString(),
				endTime: formState.endTime.toISOString(),
			};

			await axios.put(`${DOMAIN}voucher/${id}`, payload);
			message.success("Cập nhật voucher thành công");
			if (onSuccess) onSuccess();
			dispatch({type: CLOSE_DRAWER});
		} catch (err) {
			console.error(err);
			message.error("Lỗi khi cập nhật voucher");
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
					Cập nhật Voucher
				</Button>
			</Form.Item>
		</Form>
	);
}
