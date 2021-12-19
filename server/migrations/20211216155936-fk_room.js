"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("rooms", "tradePost_Id", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("rooms", {
      fields: ["tradePost_Id"],
      type: "foreign key",
      name: "tradePost_room_id_fk",
      references: {
        table: "tradePosts",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("rooms", "tradePost_room_id_fk");
    await queryInterface.removeColumn("rooms", "tradePost_Id");
  },
};
