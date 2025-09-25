const {TripPassenger, PassengerCarCompany, Trip, ImageVehicle, User, Comment, Station, Seats, Vehicles, sequelize, Point, Rate, Ticket, TimePoint, TripSeat} = require("../models");
const {Op} = require("sequelize");

const getAllTripPassengerNew = async (req, res) => {
	try {
		const [result] = await sequelize.query(
			`select * from trippassengers,trips,passengercarcompanies,vehicles ,imagevehicles
      where  trippassengers.tripId = trips.id and
      passengercarcompanies.id = trippassengers.passengerId and vehicles.id = trippassengers.vehicleId and imagevehicles.vehicleId = vehicles.id
      and trippassengers.tripId = 2 ;`
		);
		res.status(200).send(result);
	} catch (error) {
		res.status(500).send(error);
	}
};

const createTripPassenger = async (req, res) => {
	const {tripId, passengerId, startTime, endTime, vehicleId} = req.body;
	try {
		const TripPassengerFind = await TripPassenger.findOne({
			where: {
				tripId,
				vehicleId,
			},
		});
		if (TripPassengerFind) {
			res.status(404).send("Xe đã được phân vào chuyến khác, vui lòng chọn xe hoặc nhà xe khác");
			return; // cực kỳ quan trọng để tránh chạy tiếp
		}

		// Tạo chuyến mới
		const newTripPassenger = await TripPassenger.create({
			tripId,
			passengerId,
			startTime,
			endTime,
			vehicleId,
		});

		// Lấy danh sách ghế của xe
		const seatList = await Seats.findAll({
			where: {vehicleId},
		});

		// Tạo danh sách TripSeat tương ứng
		const tripSeatList = seatList.map((seat) => ({
			tripPassengerId: newTripPassenger.id,
			seatId: seat.id,
			name: seat.name,
			floor: seat.floor,
			price: seat.price,
			type: seat.type,
			status: "available",
			createdAt: new Date(),
			updatedAt: new Date(),
		}));

		// Thêm vào TripSeats
		await TripSeat.bulkCreate(tripSeatList);

		// Trả về đúng định dạng như trước
		res.status(200).json({
			message: "Tạo chuyến thành công và đã gán ghế vào chuyến",
			tripPassenger: newTripPassenger,
		});
	} catch (error) {
		console.error("Error when creating TripPassenger and TripSeats:", error);
		res.status(500).send(error);
	}
};
const getAllTripPassenger = async (req, res) => {
	const {tripId} = req.query;
	try {
		if (tripId) {
			const tripPassengerList = await TripPassenger.findAll({
				where: {
					tripId,
				},

				include: [
					{
						model: PassengerCarCompany,
						as: "passenger",
						include: [
							// {
							// 	model: Comment,
							// 	as: "passengerComment",
							// 	include: [
							// 		{
							// 			model: User,
							// 			as: "userComment",
							// 			include: {
							// 				model: Rate,
							// 				as: "userRate",
							// 			},
							// 		},
							// 	],
							// },
							{
								model: Rate,
								as: "passengerRate",
							},
						],
					},
					{
						model: Trip,
						as: "trip",
						include: [
							{
								model: Station,
								as: "from",
								// include: {
								// 	model: Point,
								// 	as: "stationPoint",
								// },
							},
							{
								model: Station,
								as: "to",
								// include: {
								// 	model: Point,
								// 	as: "stationPoint",
								// },
							},
						],
					},
					{
						model: Vehicles,
						as: "vehicle",
						include: [
							{model: Seats, as: "seatVehicle"},
							// {
							// 	model: ImageVehicle,
							// 	as: "vehicleOfImage",
							// },
						],
					},
					// {
					// 	model: Ticket,
					// 	as: "tripPassengerTicket",
					// },
				],
			});
			res.status(200).send(tripPassengerList);
		} else {
			const tripPassengerList = await TripPassenger.findAll({
				include: [
					{
						model: PassengerCarCompany,
						as: "passenger",
						include: [
							// {
							// 	model: Comment,
							// 	as: "passengerComment",
							// 	include: [
							// 		{
							// 			model: User,
							// 			as: "userComment",
							// 			include: {
							// 				model: Rate,
							// 				as: "userRate",
							// 			},
							// 		},
							// 	],
							// },
							{
								model: Rate,
								as: "passengerRate",
							},
						],
					},
					{
						model: Trip,
						as: "trip",
						include: [
							{
								model: Station,
								as: "from",
								// include: {
								// 	model: Point,
								// 	as: "stationPoint",
								// },
							},
							{
								model: Station,
								as: "to",
								// include: {
								// 	model: Point,
								// 	as: "stationPoint",
								// },
							},
						],
					},
					{
						model: Vehicles,
						as: "vehicle",
						include: [{model: Seats, as: "seatVehicle"}],
					},
					// {
					// 	model: Ticket,
					// 	as: "tripPassengerTicket",
					// },
				],
			});

			res.status(200).send(tripPassengerList);
		}
	} catch (error) {
		res.status(500).send(error);
	}
};
//SORT
const SortPriceTripPassenger = async (req, res) => {
	const {tripId, attribute, type} = req.body;
	try {
		const tripPassengerList = await TripPassenger.findAll({
			where: {
				tripId,
			},
			order: [[{model: PassengerCarCompany, as: "passenger"}, attribute, type]],
			include: [
				{
					model: PassengerCarCompany,
					as: "passenger",
					include: [
						{
							model: Rate,
							as: "passengerRate",
						},
					],
				},
				{
					model: Trip,
					as: "trip",
					include: [
						{
							model: Station,
							as: "from",
						},
						{
							model: Station,
							as: "to",
						},
					],
				},
				{
					model: Vehicles,
					as: "vehicle",
					include: [{model: Seats, as: "seatVehicle"}],
				},
			],
		});
		res.status(200).send(tripPassengerList);
	} catch (error) {
		res.status(500).send(error);
	}
};

const SortTimeTripPassenger = async (req, res) => {
	const {tripId, attribute, type} = req.body;
	try {
		const tripPassengerList = await TripPassenger.findAll({
			where: {
				tripId,
			},
			order: [[attribute, type]],
			include: [
				{
					model: PassengerCarCompany,
					as: "passenger",
					include: [
						{
							model: Rate,
							as: "passengerRate",
						},
					],
				},
				{
					model: Trip,
					as: "trip",
					include: [
						{
							model: Station,
							as: "from",
						},
						{
							model: Station,
							as: "to",
						},
					],
				},
				{
					model: Vehicles,
					as: "vehicle",
					include: [{model: Seats, as: "seatVehicle"}],
				},
			],
		});
		res.status(200).send(tripPassengerList);
	} catch (error) {
		res.status(500).send(error);
	}
};

//
//FILTER TIME

const FilterTimeTripPassenger = async (req, res) => {
	const {tripId, timeStart, timeEnd} = req.body;
	try {
		const tripPassengerList = await TripPassenger.findAll({
			where: {
				tripId,
				startTime: {
					[Op.between]: [timeStart, timeEnd],
				},
			},
			include: [
				{
					model: PassengerCarCompany,
					as: "passenger",
					include: [
						{
							model: Rate,
							as: "passengerRate",
						},
					],
				},
				{
					model: Trip,
					as: "trip",
					include: [
						{
							model: Station,
							as: "from",
						},
						{
							model: Station,
							as: "to",
						},
					],
				},
				{
					model: Vehicles,
					as: "vehicle",
					include: [{model: Seats, as: "seatVehicle"}],
				},
			],
		});
		res.status(200).send(tripPassengerList);
	} catch (error) {
		res.status(500).send(error);
	}
};

//
const getDetailTripPassenger = async (req, res) => {
	const {id} = req.params;

	try {
		const detailTrip = await TripPassenger.findOne({
			where: {
				id,
			},
			include: [
				{
					model: PassengerCarCompany,
					as: "passenger",
				},
				{
					model: Trip,
					as: "trip",
				},
				{
					model: Vehicles,
					as: "vehicle",
					include: [{model: Seats, as: "seatVehicle"}],
				},
				{
					model: Ticket,
					as: "tripPassengerTicket",
				},
			],
		});
		res.status(200).send(detailTrip);
	} catch (error) {
		res.status(500).send(error);
	}
};
const getTripPassengerByTripId = async (req, res) => {
	const {tripId} = req.params; // Lấy tripId từ params

	try {
		const tripPassengerList = await TripPassenger.findAll({
			where: {
				tripId, // Lọc theo tripId
			},
			include: [
				{
					model: PassengerCarCompany,
					as: "passenger",
					include: [
						{
							model: Rate,
							as: "passengerRate",
						},
					],
				},
				{
					model: Trip,
					as: "trip",
					include: [
						{
							model: Station,
							as: "from",
						},
						{
							model: Station,
							as: "to",
						},
					],
				},
				{
					model: Vehicles,
					as: "vehicle",
					include: [{model: Seats, as: "seatVehicle"}],
				},
				{
					model: TimePoint,
					as: "timepoints",
					include: [
						{
							model: Point,
							as: "point",
							include: [{model: Station, as: "stationPoint"}],
						},
					],
				},
			],
		});

		// Nếu không tìm thấy tripId
		if (!tripPassengerList || tripPassengerList.length === 0) {
			return res.status(404).send({message: `Không tìm thấy chuyến đi với tripId: ${tripId}`});
		}

		res.status(200).json(tripPassengerList); // Trả về danh sách hành khách theo tripId
	} catch (error) {
		console.error("Lỗi khi tìm tripPassenger:", error);
		res.status(500).send({message: "Lỗi hệ thống", error}); // Xử lý lỗi
	}
};

const deleteTripPassenger = async (req, res) => {
	const {id} = req.params;
	try {
		await TripPassenger.destroy({
			where: {
				id,
			},
		});
		res.status(200).send(`Đã xóa trip có id là: ${id}`);
	} catch (error) {
		res.status(500).send(error);
	}
};
const updateTripPassenger = async (req, res) => {
	const {id} = req.params;
	const {tripId, status, passengerId, startTime, endTime, vehicleId} = req.body;
	try {
		await TripPassenger.update(
			{tripId, status, passengerId, startTime, endTime, vehicleId},
			{
				where: {
					id,
				},
			}
		);
		res.status(200).send("update trip thành công");
	} catch (error) {
		res.status(500).send(error);
	}
};

const confirmTripPassenger = async (req, res) => {
	const {id} = req.params;
	const {statusConfirm} = req.body;

	try {
		const detailTripPassenger = await TripPassenger.findOne({
			where: {
				id,
			},
			include: [
				{
					model: Vehicles,
					as: "vehicle",
					include: [{model: Seats, as: "seatVehicle"}],
				},
			],
		});
		await TripPassenger.update(
			{status: statusConfirm},
			{
				where: {
					id,
				},
			}
		);
		if (statusConfirm === "success") {
			if (detailTripPassenger) {
				detailTripPassenger.vehicle.seatVehicle.forEach(async (seat) => {
					await Seats.update(
						{status: "chưa đặt"},
						{
							where: {
								id: seat.id,
							},
						}
					);
				});
			}
		}
		res.status(200).send("confirm trip thành công");
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	createTripPassenger,
	getAllTripPassenger,
	getDetailTripPassenger,
	deleteTripPassenger,
	updateTripPassenger,
	getAllTripPassengerNew,
	confirmTripPassenger,
	SortPriceTripPassenger,
	SortTimeTripPassenger,
	FilterTimeTripPassenger,
	getTripPassengerByTripId,
};
