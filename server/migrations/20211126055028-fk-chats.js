"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("chats", "user_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("chats", "room_Id", {
      type: Sequelize.INTEGER,
    });

    await queryInterface.addConstraint("chats", {
      fields: ["user_Id"],
      type: "foreign key",
      name: "user_chat_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("chats", {
      fields: ["room_Id"],
      type: "foreign key",
      name: "room_chat_id_fk",
      references: {
        table: "rooms",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("chats", "user_chat_id_fk");
    await queryInterface.removeConstraint("chats", "room_chat_id_fk");
    await queryInterface.removeColumn("chats", "room_Id");
    await queryInterface.removeColumn("chats", "user_Id");
  },
};
