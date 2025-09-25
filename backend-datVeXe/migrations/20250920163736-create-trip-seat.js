"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("TripSeats", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			tripPassengerId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "TripPassengers", // đúng với tên bảng
					key: "id",
				},
				onDelete: "CASCADE",
			},
			seatId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Seats",
					key: "id",
				},
				onDelete: "CASCADE",
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			floor: {
				type: Sequelize.INTEGER,
			},
			price: {
				type: Sequelize.FLOAT,
			},
			type: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "available",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("TripSeats");
	},
};
