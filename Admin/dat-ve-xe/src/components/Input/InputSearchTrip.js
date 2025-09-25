import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LoadingButton from "@mui/lab/LoadingButton";
import {SELECT_TRIP, TRIP_RENDER} from "../../redux/types/BookingTypes";
import {getProvinceAction, getTripByUserAction, getTripPassengerAction} from "../../redux/actions/bookingAction";
import moment from "moment";
import {openNotificationWithIcon} from "../../util/lib/Nofication";
import {SET_LOADING_BUTTON, HIDE_LOADING_BUTTON} from "../../redux/types/LoadingTypes";

export default function InputSearchTrip(props) {
	let {listProvince, tripByUser, tripSearch} = useSelector((state) => state.BookingReducer);

	let {loadingButton} = useSelector((state) => state.LoadingReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProvinceAction());
	}, []);
	const ListProvince = listProvince?.map((item, index) => {
		if (item.name.includes("Tỉnh")) {
			return item.name.substring(5, item.name.length);
		} else if (item.name.includes("Thành phố")) {
			return item.name.substring(10, item.name.length);
		} else {
			return item.name;
		}
	});
	const handleClick = () => {
		console.log("TripSearch Before Dispatch:", tripSearch);
		if (tripSearch.fromStation == "" || tripSearch.toStation == "" || tripSearch.startTime == "") {
			openNotificationWithIcon("error");
		} else {
			dispatch({
				type: SET_LOADING_BUTTON,
			});
			dispatch({
				type: TRIP_RENDER,
				tripRender: tripSearch,
			});
			setTimeout(function () {
				dispatch(getTripByUserAction(tripSearch));
			}, 2000);
		}
	};

	return (
		<div className="w-full search_trip">
			<div className="flex search_trips_input grid grid-cols-6">
				<div className="search_input col-span-5">
					<div className="flex">
						<div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 w-72 cursor-pointer hover:shadow-md">
							{/* Icon tròn xanh với chấm trắng */}
							<div className="flex justify-center items-center w-6 h-6 rounded-full bg-blue-600">
								<div className="w-2.5 h-2.5 rounded-full bg-white"></div>
							</div>

							{/* Autocomplete Input */}
							<Autocomplete
								value={tripSearch.fromStation}
								disablePortal
								id="combo-box-demo"
								onChange={(event, newValue) => {
									dispatch({
										type: SELECT_TRIP,
										value: newValue,
										key: "fromStation",
									});
								}}
								options={ListProvince}
								sx={{width: 220}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Nơi xuất phát" // Dùng label thay vì placeholder
										variant="outlined" // Hoặc "filled"
										InputProps={{
											...params.InputProps,
											// Nếu muốn thì tùy chỉnh thêm styles ở đây
										}}
										InputLabelProps={{
											...params.InputLabelProps,
											style: {fontWeight: 600, fontSize: 14},
										}}
									/>
								)}
							/>
						</div>
						<div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 w-72 cursor-pointer hover:shadow-md">
							{/* Icon tròn đỏ với chấm trắng */}
							<div className="flex justify-center items-center w-6 h-6 rounded-full bg-red-600">
								<div className="w-2.5 h-2.5 rounded-full bg-white"></div>
							</div>

							{/* Autocomplete Input */}
							<Autocomplete
								value={tripSearch.toStation}
								disablePortal
								id="combo-box-toStation"
								onChange={(event, newValue) => {
									dispatch({
										type: SELECT_TRIP,
										value: newValue,
										key: "toStation",
									});
								}}
								options={ListProvince}
								sx={{width: 220}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Điểm đến"
										variant="outlined"
										InputProps={{
											...params.InputProps,
											disableUnderline: true,
										}}
										InputLabelProps={{
											...params.InputLabelProps,
											style: {fontWeight: 600, fontSize: 14},
										}}
									/>
								)}
							/>
						</div>
						<div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 w-56 cursor-pointer hover:shadow-md">
							{/* Icon calendar màu xanh */}
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>

							{/* DatePicker */}
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									label="Ngày đi"
									value={tripSearch.startTime}
									views={["year", "month", "day"]}
									onChange={(newValue) => {
										dispatch({
											type: SELECT_TRIP,
											value: moment(newValue).format("YYYY-MM-DD"),
											key: "startTime",
										});
									}}
									renderInput={(params) => (
										<TextField
											{...params}
											variant="outlined"
											sx={{width: 180}}
											InputProps={{
												...params.InputProps,
												disableUnderline: true,
											}}
											InputLabelProps={{
												...params.InputLabelProps,
												style: {fontWeight: 600, fontSize: 14},
											}}
										/>
									)}
								/>
							</LocalizationProvider>
						</div>
					</div>
				</div>
				<div className="search_trips_button col-span-1 flex items-center">
					<LoadingButton
						className="w-full rounded-lg shadow-md hover:shadow-lg font-semibold text-lg"
						color="primary"
						onClick={handleClick}
						loading={loadingButton}
						loadingPosition="start"
						variant="contained"
						sx={{
							height: 48, // cao bằng input
							textTransform: "none", // không chữ in hoa
							borderRadius: 0.5, // bo góc tròn (12px ~ rounded-lg)
							boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // bóng mềm tương tự ảnh
						}}
					>
						Tìm chuyến
					</LoadingButton>
				</div>
			</div>
		</div>
	);
}
