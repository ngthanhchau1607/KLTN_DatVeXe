"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Tickets", "voucherId", {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {
				model: "Vouchers",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Tickets", "voucherId");
	},
};
