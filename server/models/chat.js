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
      models.chat.belongsTo(models.room, { foreignKey: "room_Id" });
    }
  }
  chat.init(
    {
      user_Id: DataTypes.INTEGER,
      room_Id: DataTypes.INTEGER,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "chat",
    }
  );
  return chat;
};
