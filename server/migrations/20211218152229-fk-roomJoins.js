"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("roomJoins", "user_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("roomJoins", "room_Id", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("roomJoins", {
      fields: ["user_Id"],
      type: "foreign key",
      name: "roomJoins_user_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("roomJoins", {
      fields: ["room_Id"],
      type: "foreign key",
      name: "roomJoins_room_id_fk",
      references: {
        table: "rooms",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("roomJoins", "roomJoins_user_id_fk");
    await queryInterface.removeConstraint("roomJoins", "roomJoins_room_id_fk");
    await queryInterface.removeColumn("roomJoins", "user_Id");
    await queryInterface.removeColumn("roomJoins", "room_Id");
  },
};
