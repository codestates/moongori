'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("chats", "user_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("chats", "tradePost_Id", {
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
      fields: ["tradePost_Id"],
      type: "foreign key",
      name: "tradePost_chat_id_fk",
      references: {
        table: "tradePosts",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('chats', 'user_chat_id_fk');
    await queryInterface.removeConstraint('chats', 'tradePost_chat_id_fk');
    await queryInterface.removeColumn("chats", "tradePost_Id");
    await queryInterface.removeColumn("chats", "user_Id");
  }
};
