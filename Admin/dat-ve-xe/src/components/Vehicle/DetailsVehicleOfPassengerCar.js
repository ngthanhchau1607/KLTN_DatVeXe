import React, {memo, useEffect, useState} from "react";
import {List, Avatar, Image} from "antd";
import {date} from "yup";
import {useDispatch, useSelector} from "react-redux";
import {getDetailPassenger} from "../../redux/actions/passengerAction";
import {CarOutlined} from "@ant-design/icons";
import {PREVIEW_FALSE, PREVIEW_TRUE} from "../../redux/types/PassengerTypes";

export default function DetailsVehicleOfPassengerCar(props) {
	const {id} = props;
	const dispatch = useDispatch();
	const {passengerDetail} = useSelector((state) => state.PassengerReducer);
	useEffect(() => {
		dispatch(getDetailPassenger(id));
	}, [id]);
	const renderImgVehicle = () => {
		return (
			<div
				style={{
					width: 60,
					height: 60,
					borderRadius: "50%",
					backgroundColor: "#f5f5f5",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 30,
					color: "#1890ff",
				}}
			>
				<CarOutlined />
			</div>
		);
	};
	return (
		<List
			itemLayout="horizontal"
			dataSource={passengerDetail.passengerCar}
			renderItem={(item) => (
				<List.Item>
					<List.Item.Meta
						avatar={renderImgVehicle(item)}
						title={<a>{item.name}</a>}
						description={
							<div>
								<p className="m-0">{item.description}</p>
								<div>
									Số tầng : {item.numberFloors} <span className="font-bold ml-3">Loại xe</span> : {item.type}
								</div>
							</div>
						}
					/>
				</List.Item>
			)}
		/>
	);
}
