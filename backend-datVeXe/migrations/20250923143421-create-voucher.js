"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Vouchers", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			code: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			startTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			endTime: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			discountValue: {
				type: Sequelize.FLOAT,
				allowNull: false,
				defaultValue: 0,
			},
			discountType: {
				type: Sequelize.ENUM("fixed", "percent"),
				allowNull: false,
				defaultValue: "percent", // vì bạn muốn giảm phần trăm
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "Users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			passengerId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				references: {
					model: "PassengerCarCompanies",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Vouchers");
	},
};
