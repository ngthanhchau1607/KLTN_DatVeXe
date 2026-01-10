"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("TripSeats", "ticketId", {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: "Tickets",
				key: "id",
			},
			onDelete: "SET NULL",
			onUpdate: "CASCADE",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("TripSeats", "ticketId");
	},
};
