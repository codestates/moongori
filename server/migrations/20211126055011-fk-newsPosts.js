'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("newsPosts", "user_Id", {
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint("newsPosts", {
      fields: ["user_Id"],
      type: "foreign key",
      name: "user_newsPost_id_fk",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('newsPosts', 'user_newsPost_id_fk');
    await queryInterface.removeColumn("newsPosts", "user_Id");
  }
};
