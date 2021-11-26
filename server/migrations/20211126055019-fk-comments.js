'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("comments", "user_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addColumn("comments", "newsPost_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("comments", {
      fields: ["user_Id"],
      type: "foreign key",
      name: "user_comment_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("comments", {
      fields: ["newsPost_Id"],
      type: "foreign key",
      name: "newsPost_comment_id_fk",
      references: {
        table: "newsPosts",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('comments', 'user_comment_id_fk');
    await queryInterface.removeConstraint('comments', 'newsPost_comment_id_fk');
    await queryInterface.removeColumn("comments", "newsPost_Id");
    await queryInterface.removeColumn("comments", "user_Id");
  }
};
