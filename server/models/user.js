'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.tradePost, { foreignKey: "user_Id" });
      models.user.hasMany(models.like, { foreignKey: "user_Id" });
      models.user.hasMany(models.suggestion, { foreignKey: "user_Id" });
      models.user.hasMany(models.newsPost, { foreignKey: "user_Id" });
      models.user.hasMany(models.comment, { foreignKey: "user_Id" });
      models.user.hasMany(models.chat, { foreignKey: "user_Id" });
    }
  };
  user.init({
    email: DataTypes.STRING,
    nickname: DataTypes.STRING,
    address: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    authState: { defaultValue: 0, type: DataTypes.INTEGER },
    img: { defaultValue: null, type: DataTypes.STRING },
    reliability: { defaultValue: 0, type: DataTypes.INTEGER }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};