"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Ticket extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({User, TripPassenger, PointTicket, SeatTicket, Voucher}) {
			this.belongsTo(User, {foreignKey: "user_id", as: "user", onDelete: "cascade"});
			this.belongsTo(TripPassenger, {
				foreignKey: "tripPassengerId",
				as: "tripPassengerTicket",
				onDelete: "cascade",
			});
			this.hasMany(PointTicket, {foreignKey: "ticketId", as: "ticketPointId", onDelete: "cascade"});
			this.hasMany(SeatTicket, {foreignKey: "ticketId", as: "ticketSeatId", onDelete: "cascade"});
			this.belongsTo(Voucher, {foreignKey: "voucherId", as: "voucher", onDelete: "SET NULL"}); // Thêm association voucher
		}
	}
	Ticket.init(
		{
			note: DataTypes.STRING,
			status: DataTypes.STRING,
			totalAmount: DataTypes.FLOAT,
			user_id: DataTypes.INTEGER,
			tripPassengerId: DataTypes.INTEGER,
			voucherId: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: "Vouchers",
					key: "id",
				},
			},
			listSeat1: {
				type: DataTypes.JSON, // kiểu JSON lưu array ghế đầy đủ
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: "Ticket",
		}
	);
	return Ticket;
};
