const {Rate, User, Comment, PassengerCarCompany} = require("../models");

const createRating = async (req, res) => {
	const {numberRate, userId, passengerId} = req.body;

	// Kiểm tra dữ liệu đầu vào
	if (!numberRate || !userId || !passengerId) {
		return res.status(400).json({error: "Missing required fields"});
	}

	try {
		// Tạo đánh giá mới
		const newRate = await Rate.create({
			numberRate,
			userId,
			passengerId,
		});

		// Lấy lại rate vừa tạo, kèm thông tin user và công ty xe khách
		const fullRate = await Rate.findOne({
			where: {id: newRate.id},
			include: [
				{
					model: User,
					as: "userRate", // phải đúng alias bạn đặt trong model
				},
				{
					model: PassengerCarCompany,
					as: "passengerRate",
				},
			],
		});

		res.status(201).json(fullRate);
	} catch (error) {
		console.error("Error creating rate:", error);
		res.status(500).json({error: error.message});
	}
};
const getAllRate = async (req, res) => {
	try {
		const RateList = await Rate.findAll({});

		res.status(200).send(RateList);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getAllRateByPassengerId = async (req, res) => {
	const {passengerId} = req.params;

	try {
		const rateList = await Rate.findAll({
			where: {passengerId: passengerId},
		});

		if (!rateList || rateList.length === 0) {
			// return res.status(404).json({ message: "No ratings found for this passengerId." });
			return res.status(200).json([]); // return để không chạy tiếp xuống dưới
		}

		res.status(200).json(rateList);
	} catch (error) {
		console.error("Error fetching rates by passengerId:", error);
		res.status(500).json({error: error.message});
	}
};

const updateRate = async (req, res) => {
	const {id} = req.params; // id của Rate cần update
	const {numberRate} = req.body;

	// Kiểm tra dữ liệu đầu vào
	if (!numberRate) {
		return res.status(400).json({error: "Missing required field: numberRate"});
	}

	try {
		// Cập nhật numberRate cho Rate có id tương ứng
		const [updatedRowsCount] = await Rate.update(
			{numberRate},
			{
				where: {id},
			}
		);

		if (updatedRowsCount === 0) {
			return res.status(404).json({error: "Rate not found or no change made"});
		}

		// Lấy lại rate vừa cập nhật
		const updatedRate = await Rate.findOne({
			where: {id},
			include: [
				{
					model: User,
					as: "userRate",
				},
				{
					model: PassengerCarCompany,
					as: "passengerRate",
				},
			],
		});

		res.status(200).json(updatedRate);
	} catch (error) {
		console.error("Error updating rate:", error);
		res.status(500).json({error: error.message});
	}
};

const deleteRate = async (req, res) => {
	const {id} = req.params;
	try {
		await Rate.destroy({
			where: {
				id,
			},
		});
		res.status(200).send(`Đã xóa `);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	createRating,
	getAllRate,
	getAllRateByPassengerId,
	updateRate,
	deleteRate,
};
