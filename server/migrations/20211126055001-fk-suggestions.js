'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("suggestions", "user_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("suggestions", "tradePost_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("suggestions", {
      fields: ["user_Id"],
      type: "foreign key",
      name: "user_suggestion_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("suggestions", {
      fields: ["tradePost_Id"],
      type: "foreign key",
      name: "tradePost_suggestion_id_fk",
      references: {
        table: "tradePosts",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('suggestions', 'user_suggestion_id_fk');
    await queryInterface.removeConstraint('suggestions', 'tradePost_suggestion_id_fk');
    await queryInterface.removeColumn("suggestions", "tradePost_Id");
    await queryInterface.removeColumn("suggestions", "user_Id");
  }
};
