import React, {Fragment, useEffect, useState} from "react";
import {Layout, Breadcrumb, Table, Input, Space, Popconfirm, Button, message} from "antd";
import {EditOutlined, DeleteOutlined, PercentageOutlined} from "@ant-design/icons";
import {OPEN_DRAWER} from "../../redux/types/DrawerTypes";
import {useDispatch} from "react-redux";
import axios from "axios";
import AddVoucher from "../../components/Add/AddVoucher";
import EditVoucher from "../../components/Edit/EditVoucher";

const {Content} = Layout;

export default function AdminVoucher() {
	const [vouchers, setVouchers] = useState([]);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const fetchVouchers = async () => {
		setLoading(true);
		try {
			const res = await axios.get("http://localhost:8000/api/v1/voucher");
			let data = res.data.data;

			setVouchers(data);
		} catch (err) {
			console.error("Lỗi khi lấy danh sách voucher:", err);
			message.error("Không thể lấy danh sách voucher");
		} finally {
			setLoading(false);
		}
	};

	const deleteVoucher = async (id) => {
		try {
			await axios.delete(`http://localhost:8000/api/v1/voucher/${id}`);
			message.success("Xoá voucher thành công");
			fetchVouchers();
		} catch (err) {
			console.error("Lỗi khi xoá voucher:", err);
			message.error("Xoá voucher thất bại");
		}
	};

	useEffect(() => {
		fetchVouchers();
	}, []);

	const columns = [
		{
			title: "Mã Voucher",
			dataIndex: "code",
			sorter: (a, b) => a.code.localeCompare(b.code),
		},
		{
			title: "Bắt đầu",
			dataIndex: "startTime",
			render: (text) => new Date(text).toLocaleDateString(),
		},
		{
			title: "Kết thúc",
			dataIndex: "endTime",
			render: (text) => new Date(text).toLocaleDateString(),
		},
		{
			title: "Giảm (%)",
			dataIndex: "discountValue",
		},
		{
			title: "Nhà xe",
			render: (_, record) => record.passengerVoucher?.name || "Tất cả",
		},
		{
			title: "Thao tác",
			render: (text, item) => {
				return (
					<Fragment>
						<Button
							type="link"
							icon={<EditOutlined />}
							onClick={() => {
								dispatch({
									type: OPEN_DRAWER,
									title: `Cập nhật Voucher`,
									content: <EditVoucher id={item.id} onSuccess={fetchVouchers} />, // Truyền ID vào component
								});
							}}
						/>

						<Popconfirm title="Bạn có chắc chắn muốn xoá voucher này không?" onConfirm={() => deleteVoucher(item.id)} okText="Yes" cancelText="No">
							<Button danger type="link" icon={<DeleteOutlined />} />
						</Popconfirm>
					</Fragment>
				);
			},
		},
	];

	return (
		<Content style={{margin: "0 16px"}}>
			<Breadcrumb style={{margin: "16px 0"}}>
				<Breadcrumb.Item>Admin</Breadcrumb.Item>
				<Breadcrumb.Item>Voucher</Breadcrumb.Item>
			</Breadcrumb>

			<div className="site-layout-background" style={{padding: 12, minHeight: 360}}>
				<Space direction="vertical" className="w-full mb-3" style={{width: "100%"}}>
					<Button
						type="primary"
						icon={<PercentageOutlined />}
						onClick={() =>
							dispatch({
								type: OPEN_DRAWER,
								title: "Thêm Voucher",
								content: <AddVoucher onSuccess={fetchVouchers} />,
							})
						}
					>
						Thêm Voucher
					</Button>

					<Table rowKey={"id"} columns={columns} dataSource={vouchers} loading={loading} pagination={{pageSize: 10}} />
				</Space>
			</div>
		</Content>
	);
}
