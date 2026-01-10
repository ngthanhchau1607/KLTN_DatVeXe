"use strict";
const {Model} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Rate extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index.js` file will call this method automatically.
		 */
		static associate({PassengerCarCompany, User, Comment}) {
			this.belongsTo(User, {
				foreignKey: "userId",
				as: "userRate",
				onDelete: "cascade",
			});
			this.belongsTo(PassengerCarCompany, {
				foreignKey: "passengerId",
				as: "passengerRate",
				onDelete: "cascade",
			});
		}
	}

	Rate.init(
		{
			numberRate: DataTypes.INTEGER,
			userId: DataTypes.INTEGER,
			passengerId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: "Rate",
			tableName: "rates",
			freezeTableName: true,
			timestamps: true,
		}
	);

	return Rate;
};
