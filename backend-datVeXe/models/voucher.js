"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Voucher extends Model {
		static associate(models) {
			// Ràng buộc với PassengerCarCompany hoặc Passenger (tùy bạn xài tên nào)
			this.belongsTo(models.PassengerCarCompany, {
				foreignKey: "passengerId",
				as: "passengerVoucher",
			});
		}
	}

	Voucher.init(
		{
			code: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			startTime: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			endTime: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			discountValue: {
				type: DataTypes.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: true, // Nếu null thì dành cho tất cả user
			},
			passengerId: {
				type: DataTypes.INTEGER,
				allowNull: true, // Nếu null thì áp dụng cho tất cả nhà xe
			},
		},
		{
			sequelize,
			modelName: "Voucher",
		}
	);

	return Voucher;
};
