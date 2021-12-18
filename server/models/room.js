"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.room.hasMany(models.roomJoin, { foreignKey: "room_Id" });
      models.room.belongsTo(models.tradePost, { foreignKey: "tradePost_Id" });
    }
  }
  room.init(
    {
      tradePost_Id: DataTypes.INTEGER,
      roomName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "room",
    }
  );
  return room;
};
