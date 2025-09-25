const {Voucher, Ticket, PassengerCarCompany} = require("../models");
const {Op} = require("sequelize");

// Tạo voucher
const createVoucher = async (req, res) => {
	try {
		const {code, startTime, endTime, discountValue, userId = null, passengerId = null} = req.body;

		// Kiểm tra trùng mã
		const existing = await Voucher.findOne({where: {code}});
		if (existing) {
			return res.status(400).json({message: "Voucher code already exists."});
		}

		const newVoucher = await Voucher.create({
			code,
			startTime,
			endTime,
			discountValue,
			userId: userId || null, // nếu không truyền hoặc null thì lưu null
			passengerId: passengerId || null,
		});

		return res.status(201).json({
			message: "Voucher created successfully",
			data: newVoucher,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({message: "Server error", error});
	}
};

const checkVoucherUsed = async (req, res) => {
	try {
		const {voucherCode, userId} = req.body;

		if (!voucherCode || !userId) {
			return res.status(400).json({message: "Thiếu voucherCode hoặc userId"});
		}

		// Tìm voucher theo code
		const voucher = await Voucher.findOne({where: {code: voucherCode}});
		if (!voucher) {
			return res.status(404).json({message: "Voucher không tồn tại"});
		}

		// Kiểm tra trong bảng Ticket xem user này đã dùng voucher chưa
		const usedTicket = await Ticket.findOne({
			where: {
				user_id: userId,
				voucherId: voucher.id,
			},
		});

		// Lấy giá trị giảm giá từ voucher
		const discountValue = voucher.discountValue || 0;

		if (usedTicket) {
			return res.status(200).json({used: true, message: "User đã sử dụng voucher này", discountValue, voucherId: voucher.id});
		} else {
			return res.status(200).json({used: false, message: "User chưa sử dụng voucher này", discountValue, voucherId: voucher.id});
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({message: "Lỗi server", error: error.message});
	}
};

// Lấy voucher theo ID
const getVoucherById = async (req, res) => {
	try {
		const {id} = req.params;

		const voucher = await Voucher.findOne({
			where: {id},
			include: [
				{
					model: PassengerCarCompany,
					as: "passengerVoucher", // nhớ đúng alias
				},
			],
			attributes: {exclude: ["userId"]}, // nếu không cần userId
		});

		if (!voucher) {
			return res.status(404).json({message: "Voucher không tồn tại"});
		}

		return res.status(200).json({data: voucher});
	} catch (error) {
		console.error(error);
		return res.status(500).json({message: "Lỗi server", error: error.message});
	}
};

const updateVoucher = async (req, res) => {
	try {
		const {id} = req.params;
		const {code, startTime, endTime, discountValue, passengerId = null} = req.body;

		const voucher = await Voucher.findByPk(id);
		if (!voucher) {
			return res.status(404).json({message: "Voucher không tồn tại"});
		}

		// Kiểm tra trùng code với voucher khác
		if (code && code !== voucher.code) {
			const existing = await Voucher.findOne({
				where: {
					code,
					id: {[Op.ne]: id}, // không phải chính voucher đang sửa
				},
			});
			if (existing) {
				return res.status(400).json({message: "Mã voucher đã tồn tại"});
			}
		}

		// Cập nhật
		await voucher.update({
			code,
			startTime,
			endTime,
			discountValue,
			passengerId,
		});

		return res.status(200).json({
			message: "Cập nhật voucher thành công",
			data: voucher,
		});
	} catch (error) {
		console.error("❌ Error updating voucher:", error);
		return res.status(500).json({message: "Lỗi server", error: error.message});
	}
};

// Lấy tất cả voucher
const getAllVouchers = async (req, res) => {
	try {
		const vouchers = await Voucher.findAll({
			include: [
				{
					model: PassengerCarCompany,
					as: "passengerVoucher",
				},
			],
			attributes: {exclude: ["userId"]}, // Loại bỏ userId nếu không cần
			order: [["createdAt", "DESC"]],
		});
		return res.status(200).json({data: vouchers});
	} catch (error) {
		console.error(error);
		return res.status(500).json({message: "Server error", error});
	}
};

// Xóa voucher theo ID
const deleteVoucher = async (req, res) => {
	try {
		const {id} = req.params;

		const deleted = await Voucher.destroy({
			where: {id},
		});

		if (!deleted) {
			return res.status(404).json({message: "Voucher not found"});
		}

		return res.status(200).json({message: "Voucher deleted successfully"});
	} catch (error) {
		console.error(error);
		return res.status(500).json({message: "Server error", error});
	}
};

module.exports = {
	createVoucher,
	getAllVouchers,
	deleteVoucher,
	checkVoucherUsed,
	getVoucherById,
	updateVoucher,
};
