'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.suggestion.belongsTo(models.user, { foreignKey: "user_Id" });
      models.suggestion.belongsTo(models.tradePost, { foreignKey: "tradePost_Id" });
    }
  };
  suggestion.init({
    user_Id: DataTypes.INTEGER,
    tradePost_Id: DataTypes.INTEGER,
    cost: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'suggestion',
  });
  return suggestion;
};