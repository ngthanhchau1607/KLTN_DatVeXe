import React, {useEffect, useState} from "react";
import {Breadcrumb, DatePicker, Select, Button, Row, Col, Card, Table, Statistic, Tabs, message} from "antd";
import {Content} from "antd/lib/layout/layout";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import axios from "axios";
import moment from "moment";
import {getProvinceAction} from "../../redux/actions/bookingAction";

const {Option} = Select;
const {TabPane} = Tabs;

export default function AdminTicketStatics() {
	const [tickets, setTickets] = useState([]);
	const [filteredTickets, setFilteredTickets] = useState([]);

	const dispatch = useDispatch();
	const {listProvince} = useSelector((state) => state.BookingReducer);

	useEffect(() => {
		dispatch(getProvinceAction());
	}, [dispatch]);

	const [date, setDate] = useState(null);
	const [from, setFrom] = useState(null);
	const [to, setTo] = useState(null);

	const [statistic, setStatistic] = useState({totalTicket: 0, totalRevenue: 0});

	useEffect(() => {
		const fetchTickets = async () => {
			try {
				const res = await axios.get("http://localhost:8000/api/v1/ticket");
				setTickets(res.data);
				setFilteredTickets(res.data);
			} catch (error) {
				message.error("Không lấy được dữ liệu vé");
			}
		};
		fetchTickets();
	}, []);

	useEffect(() => {
		if (!filteredTickets || filteredTickets.length === 0) {
			setStatistic({totalTicket: 0, totalRevenue: 0});
			return;
		}

		const totalTicket = filteredTickets.length;
		const totalRevenue = filteredTickets.reduce((sum, t) => sum + (t.totalAmount || 0), 0);

		setStatistic({totalTicket, totalRevenue});
	}, [filteredTickets]);

	const ListProvince = listProvince?.map((item) => {
		if (item.name.includes("Tỉnh")) return item.name.substring(5);
		if (item.name.includes("Thành phố")) return item.name.substring(10);
		return item.name;
	});

	const columns = [
		{title: "Mã Vé", dataIndex: "id", render: (id) => `VE${id.toString().padStart(3, "0")}`},
		{title: "Chuyến Đi", dataIndex: "tripPassengerTicket", render: (trip) => (trip ? `${trip.trip.from.name} → ${trip.trip.to.name}` : "")},
		{title: "Giá Vé", dataIndex: "totalAmount", render: (price) => price.toLocaleString() + " đ"},
		{
			title: "Ngày Bán",
			dataIndex: "createdAt",
			render: (date) => moment(date).format("DD-MM-YYYY"),
			sorter: (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf(),
			sortDirections: ["descend", "ascend"], // mới nhất ↔ trễ nhất
		},
		{
			title: "Ngày Xuất Phát",
			dataIndex: "tripPassengerTicket",
			render: (trip) => (trip?.trip?.startTime ? moment(trip.trip.startTime).format("DD-MM-YYYY") : ""),
			sorter: (a, b) => {
				const dateA = a.tripPassengerTicket?.trip?.startTime ? moment(a.tripPassengerTicket.trip.startTime).valueOf() : 0;
				const dateB = b.tripPassengerTicket?.trip?.startTime ? moment(b.tripPassengerTicket.trip.startTime).valueOf() : 0;
				return dateA - dateB;
			},
			sortDirections: ["descend", "ascend"],
		},
	];

	// 🔹 Tìm kiếm theo ngày
	const handleSearchByDate = () => {
		if (!date) {
			message.warning("Vui lòng chọn ngày");
			return;
		}

		// ngày admin chọn
		const selectedDate = date.format("YYYY-MM-DD");

		const filtered = tickets.filter((ticket) => {
			if (!ticket.createdAt) return false;

			const ticketDate = moment(ticket.createdAt).format("YYYY-MM-DD");
			return ticketDate === selectedDate;
		});

		setFilteredTickets(filtered);

		const totalTicket = filtered.length;
		const totalRevenue = filtered.reduce((sum, t) => sum + (t.totalAmount || 0), 0);

		setStatistic({totalTicket, totalRevenue});
	};
	// 🔹 Tìm kiếm theo chuyến đi
	const handleSearchByTrip = () => {
		if (!from || !to) {
			message.warning("Vui lòng chọn điểm đi và điểm đến");
			return;
		}

		const filtered = tickets.filter((ticket) => {
			const trip = ticket?.tripPassengerTicket?.trip;
			if (!trip) return false;

			const matchFrom = trip.from?.province === from;
			const matchTo = trip.to?.province === to;

			return matchFrom && matchTo;
		});

		setFilteredTickets(filtered);
		const totalTicket = filtered.length;
		const totalRevenue = filtered.reduce((sum, t) => sum + t.totalAmount, 0);
		setStatistic({totalTicket, totalRevenue});
	};

	return (
		<Content style={{margin: "0 16px"}}>
			<Breadcrumb style={{margin: "16px 0"}}>
				<Breadcrumb.Item>Admin</Breadcrumb.Item>
				<Breadcrumb.Item>Thống Kê Vé</Breadcrumb.Item>
			</Breadcrumb>

			<div style={{padding: 24, background: "#fff"}}>
				<h2>📊 Thống Kê Vé</h2>

				<Tabs defaultActiveKey="1">
					{/* TAB 1: Tìm kiếm theo ngày */}
					<TabPane tab="Tìm kiếm theo ngày" key="1">
						<Row gutter={16} style={{marginBottom: 20}}>
							<Col span={6}>
								<DatePicker style={{width: "100%"}} placeholder="Chọn ngày" onChange={(value) => setDate(value)} />
							</Col>
							<Col span={6}>
								<Button type="primary" block onClick={handleSearchByDate}>
									Tìm kiếm
								</Button>
							</Col>
						</Row>
					</TabPane>

					{/* TAB 2: Tìm kiếm theo chuyến đi */}
					<TabPane tab="Tìm kiếm theo chuyến đi" key="2">
						<Row gutter={16} style={{marginBottom: 20}}>
							<Col span={6}>
								<Select placeholder="Từ đâu" style={{width: "100%"}} onChange={setFrom} value={from}>
									{ListProvince.map((province, idx) => (
										<Option key={idx} value={province}>
											{province}
										</Option>
									))}
								</Select>
							</Col>
							<Col span={6}>
								<Select placeholder="Đến đâu" style={{width: "100%"}} onChange={setTo} value={to}>
									{ListProvince.map((province, idx) => (
										<Option key={idx} value={province}>
											{province}
										</Option>
									))}
								</Select>
							</Col>
							<Col span={6}>
								<Button type="primary" block onClick={handleSearchByTrip}>
									Tìm kiếm
								</Button>
							</Col>
						</Row>
					</TabPane>
				</Tabs>

				{/* STATISTIC */}
				<Row gutter={16} style={{marginBottom: 20}}>
					<Col span={12}>
						<Card>
							<Statistic title="Tổng Số Vé Bán" value={statistic.totalTicket} />
						</Card>
					</Col>
					<Col span={12}>
						<Card>
							<Statistic title="Tổng Doanh Thu" value={statistic.totalRevenue} suffix="đ" />
						</Card>
					</Col>
				</Row>

				{/* TABLE */}
				{filteredTickets.length === 0 ? <div style={{textAlign: "center", padding: 40, fontSize: 16}}>🚫 Không có vé nào được bán</div> : <Table columns={columns} dataSource={filteredTickets} rowKey="id" pagination={{pageSize: 5}} />}
			</div>
		</Content>
	);
}
