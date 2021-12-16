"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.chat.belongsTo(models.user, { foreignKey: "user_Id" });
      models.chat.belongsTo(models.tradePost, { foreignKey: "tradePost_Id" });
      models.chat.belongsTo(models.suggestion, { foreignKey: "suggestion_Id" });
    }
  }
  chat.init(
    {
      user_Id: DataTypes.INTEGER,
      tradePost_Id: DataTypes.INTEGER,
      suggestion_Id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "chat",
    }
  );
  return chat;
};
