'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.like.belongsTo(models.user, { foreignKey: "user_Id" });
      models.like.belongsTo(models.tradePost, { foreignKey: "tradePost_Id" });
    }
  };
  like.init({
    user_Id: DataTypes.INTEGER,
    tradePost_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};