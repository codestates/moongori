"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class roomJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.roomJoin.belongsTo(models.room, { foreignKey: "room_Id" });
      models.roomJoin.belongsTo(models.user, { foreignKey: "user_Id" });
    }
  }
  roomJoin.init(
    {
      user_Id: DataTypes.INTEGER,
      room_Id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "roomJoin",
    }
  );
  return roomJoin;
};
