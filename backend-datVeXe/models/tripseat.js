"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class TripSeat extends Model {
		static associate({TripPassenger, Seats}) {
			this.belongsTo(TripPassenger, {
				foreignKey: "tripPassengerId",
				as: "tripPassenger",
				onDelete: "CASCADE",
			});
			this.belongsTo(Seats, {
				foreignKey: "seatId",
				as: "seat",
				onDelete: "CASCADE",
			});
		}
	}

	TripSeat.init(
		{
			tripPassengerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			seatId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			floor: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			price: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			status: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "available", // có thể là 'booked' sau khi đặt
			},
		},
		{
			sequelize,
			modelName: "TripSeat",
			tableName: "tripseats",
			freezeTableName: true,
			timestamps: true,
		}
	);

	return TripSeat;
};
