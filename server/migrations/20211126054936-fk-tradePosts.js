'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("tradePosts", "user_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("tradePosts", {
      fields: ["user_Id"],
      type: "foreign key",
      name: "user_tradePost_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('tradePosts', 'user_tradePost_id_fk');
    await queryInterface.removeColumn("tradePosts", "user_Id");
  }
};
