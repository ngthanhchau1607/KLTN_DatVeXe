import React, {useEffect} from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {useDispatch, useSelector} from "react-redux";
import {MinusCircleOutlined, PlusOutlined, FormOutlined, DeleteOutlined} from "@ant-design/icons";
import {Form, Input, Button, Space, Select, message, Popconfirm, Popover} from "antd";
import Tooltip from "@mui/material/Tooltip";
import {bookingSeatAction, bookingTicketAction} from "../../redux/actions/bookingAction";
import Wheel from "../Booking/Seat/Wheel";
import Seat from "../Booking/Seat/Seat";
import SeatBooked from "../Booking/Seat/SeatBooked";
import SeatSelect from "../Booking/Seat/SeatSelect";
import "../../Sass/css/Vehicle.css";
import {getDetailVehicleAction} from "../../redux/actions/vehicleAction";
import {CreateSeatVehicleAction, DeleteSeatAction, getSeatDetailAction} from "../../redux/actions/SeatAction";
import {SET_MODAL} from "../../redux/types/ModalTypes";
import {OPEN_DRAWER} from "../../redux/types/DrawerTypes";
import EditSeat from "../Edit/EditSeat";

const {Option} = Select;

export default function DetailSeatVehicle(props) {
	const dispatch = useDispatch();
	const {listSeatSelected} = useSelector((state) => state.BookingReducer);
	const {vehicleDetail, seatDetail} = useSelector((state) => state.vehicleReducer);

	const [form] = Form.useForm();

	// Tính giá mặc định dựa theo loại xe
	const defaultPrice = React.useMemo(() => {
		if (!vehicleDetail) return 0;
		if (vehicleDetail.type === "normal") {
			return vehicleDetail.passengerCar?.price || 0;
		} else if (vehicleDetail.type === "limouse") {
			return (vehicleDetail.passengerCar?.price || 0) + 100000;
		} else {
			return 0;
		}
	}, [vehicleDetail]);

	useEffect(() => {
		dispatch(getDetailVehicleAction(props.id));
	}, [props.id]);

	const seatType = vehicleDetail?.type === "normal" ? {label: "Ghế Ngồi", value: "seat"} : vehicleDetail?.type === "limouse" ? {label: "Giường Nằm", value: "bed"} : {label: "Không xác định", value: ""};

	// Khi vehicleDetail.type thay đổi, cập nhật lại type cho tất cả ghế mới trong form
	useEffect(() => {
		if (!vehicleDetail) return;

		const seatTypeValue = vehicleDetail.type === "normal" ? "seat" : vehicleDetail.type === "limouse" ? "bed" : "";

		const currentSeats = form.getFieldValue("ListSeatAdd") || [];

		const updatedSeats = currentSeats.map((seat) => ({
			...seat,
			type: seatTypeValue,
			price: defaultPrice,
		}));

		form.setFieldsValue({
			ListSeatAdd: updatedSeats,
		});
	}, [vehicleDetail?.type, defaultPrice, form]);

	const onFinish = (values) => {
		console.log("Received values of form:", values);
		let listSeat = values.ListSeatAdd;
		if (vehicleDetail.seatVehicle.length <= 40) {
			let filterFloor1 = vehicleDetail.seatVehicle.filter((item) => item.floor == 1).length;
			let seatFloor2 = vehicleDetail.seatVehicle.length - filterFloor1;
			try {
				if (filterFloor1 >= 20) {
					if (seatFloor2 >= 20) {
						message.error("Thêm ghế xe thất bại");
					} else {
						dispatch(CreateSeatVehicleAction(vehicleDetail.id, listSeat));
						dispatch(getDetailVehicleAction(props.id));
					}
				} else {
					dispatch(CreateSeatVehicleAction(vehicleDetail.id, listSeat));
					dispatch(getDetailVehicleAction(props.id));
				}
			} catch (error) {}
		} else {
			message.error("Thêm ghế xe thất bại");
		}
	};

	// Các hàm render ghế, tầng ... giữ nguyên như bạn đã viết

	const renderSeat = (floor) => {
		const seatsOnFloor = vehicleDetail.seatVehicle.filter((item) => item.floor === floor);
		const mid = Math.ceil(seatsOnFloor.length / 2);
		const leftColumn = seatsOnFloor.slice(0, mid);
		const rightColumn = seatsOnFloor.slice(mid);

		const rows = [];
		const maxRows = Math.max(leftColumn.length, rightColumn.length);

		for (let i = 0; i < maxRows; i++) {
			const leftSeat = leftColumn[i];
			const rightSeat = rightColumn[i];

			rows.push(
				<tr key={`row-${floor}-${i}`} className="coach-row">
					<td className="seat">{leftSeat ? renderSeatItem(leftSeat) : null}</td>
					<td className="seat">{rightSeat ? renderSeatItem(rightSeat) : null}</td>
				</tr>
			);
		}

		return rows;
	};

	const renderSeatItem = (item) => {
		let classDaDat = item.status === "đã đặt" ? "gheDaChon" : "";
		let classDangDat = "";

		let indexSeatSelect = listSeatSelected.findIndex((seatSelect) => seatSelect.id === item.id);
		if (indexSeatSelect !== -1) {
			classDangDat = "GheDangChon";
		}

		let disabled = item.status === "đã đặt";

		let arrClass = [classDaDat, classDangDat];

		const content = (
			<div className="flex justify-center">
				<Button
					type="primary"
					onClick={() => {
						dispatch({
							type: OPEN_DRAWER,
							title: `Cập Nhật Cho Ghế ${item.name} , Giá ${item.price}`,
							content: <EditSeat id={item.id} />,
							width: 300,
						});
					}}
				>
					<FormOutlined />
				</Button>
				<Popconfirm
					placement="topRight"
					title={"Bạn có muốn xóa ghế này"}
					onConfirm={() => {
						dispatch(DeleteSeatAction(item.id, vehicleDetail.id));
					}}
					okText="Yes"
					cancelText="No"
				>
					<Button className="bg-red-600 ml-5" style={{backgroundColor: "red"}}>
						<DeleteOutlined className="text-red-600" />
					</Button>
				</Popconfirm>
			</div>
		);

		return (
			<Popover title={`Ghế: ${item.name}, Giá: ${item.price.toLocaleString()} VNĐ`} content={content} placement="top">
				<button className="seat" style={{border: "none"}} disabled={disabled}>
					<div className="seat-container">
						<Seat arrClass={arrClass} />
					</div>
				</button>
			</Popover>
		);
	};

	const renderFloor = () => {
		let arr = [];
		for (let index = 1; index <= vehicleDetail.numberFloors; index++) {
			arr.push(
				<div className="coach-container" key={`floor-${index}`}>
					<span>Tầng {index}</span>
					<div className="coach">
						<table>
							<tbody>
								<tr className="coach-row">
									<td className="seat">
										<div className="seat-container" data-disabled="true" disabled>
											<Wheel />
										</div>
									</td>
								</tr>
								<div className="coach-row">{renderSeat(index)}</div>
							</tbody>
						</table>
					</div>
				</div>
			);
		}
		return arr;
	};

	return (
		<>
			<div className="flex justify-center items-center">
				<div className="list-seat flex" style={{width: "80%"}}>
					<div className="seat-groups">
						<div className="note font-bold" style={{fontSize: "14px"}}>
							Chú thích
						</div>
						<div className="seat-info">
							<div className="seat-thumbnail">
								<Seat />
							</div>
							<span className="seat-name">Còn trống</span>
						</div>
						<div className="seat-info">
							<div className="seat-thumbnail" disabled>
								<SeatBooked />
							</div>
							<span className="seat-name">Ghế đã được đặt</span>
						</div>
						<div />
					</div>
					<div className="seat-template flex justify-center items-center">{vehicleDetail && renderFloor()}</div>
				</div>
			</div>

			<div style={{margin: "30px auto", width: "60%"}}>
				<h3>Thêm ghế cho xe</h3>

				{/* <div style={{marginBottom: 16, fontWeight: "bold", fontSize: 16}}>Loại ghế: {seatType.label}</div> */}

				<Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
					<Form.List name="ListSeatAdd">
						{(fields, {add, remove}) => (
							<>
								{fields.map(({key, name, ...restField}) => (
									<Space key={key} style={{display: "flex", marginBottom: 8}} align="baseline">
										<Form.Item {...restField} name={[name, "name"]} rules={[{required: true, message: "Missing seats name"}]}>
											<Input placeholder="Tên Ghế" />
										</Form.Item>
										<Form.Item {...restField} name={[name, "price"]} rules={[{required: true, message: "Missing price"}]}>
											<Input placeholder="Giá Ghế" type="number" min={50000} disabled />
										</Form.Item>
										<Form.Item {...restField} name={[name, "floor"]} rules={[{required: true, message: "Missing floor"}]}>
											<Select placeholder="Tầng" style={{width: 130}}>
												<Option key={"1"} value={1}>
													Tầng 1
												</Option>
												<Option key={"2"} value={2}>
													Tầng 2
												</Option>
											</Select>
										</Form.Item>
										<Form.Item {...restField} name={[name, "type"]} rules={[{required: true, message: "Missing type"}]}>
											<Select disabled>{seatType.value === "seat" ? <Option value="seat">Ghế Ngồi</Option> : <Option value="bed">Giường Nằm</Option>}</Select>
										</Form.Item>
										<MinusCircleOutlined onClick={() => remove(name)} />
									</Space>
								))}
								<Form.Item>
									<Button type="dashed" onClick={() => add({type: seatType.value, price: defaultPrice})} block icon={<PlusOutlined />}>
										Thêm
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>

					<Form.Item className="text-center">
						<Button type="primary" htmlType="submit">
							Thêm Ghế
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}
