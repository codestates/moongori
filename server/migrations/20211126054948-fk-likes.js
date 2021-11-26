'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("likes", "user_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("likes", "tradePost_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("likes", {
      fields: ["user_Id"],
      type: "foreign key",
      name: "user_like_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("likes", {
      fields: ["tradePost_Id"],
      type: "foreign key",
      name: "tradePost_like_id_fk",
      references: {
        table: "tradePosts",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('likes', 'user_like_id_fk');
    await queryInterface.removeConstraint('likes', 'tradePost_like_id_fk');
    await queryInterface.removeColumn("likes", "tradePost_Id");
    await queryInterface.removeColumn("likes", "user_Id");
  }
};
