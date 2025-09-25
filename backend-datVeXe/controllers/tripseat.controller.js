const {TripSeat} = require("../models");

const getTripSeatsByTripPassengerId = async (req, res) => {
	const {tripPassengerId} = req.params;

	try {
		const tripSeats = await TripSeat.findAll({
			where: {tripPassengerId},
			attributes: ["id", "seatId", "name", "floor", "price", "type", "status"],
			order: [["name", "ASC"]],
		});

		if (!tripSeats || tripSeats.length === 0) {
			return res.status(404).json({message: "Không tìm thấy ghế cho chuyến này"});
		}

		return res.status(200).json(tripSeats);
	} catch (error) {
		console.error("Lỗi lấy danh sách TripSeat:", error);
		return res.status(500).json({message: "Lỗi server"});
	}
};

module.exports = {
	getTripSeatsByTripPassengerId,
};
