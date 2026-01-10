module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Tickets", "listSeat1", {
			type: Sequelize.JSON,
			allowNull: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Tickets", "listSeat1");
	},
};
