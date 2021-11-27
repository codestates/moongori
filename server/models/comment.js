'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.comment.belongsTo(models.user, { foreignKey: "user_Id" });
      models.comment.belongsTo(models.newsPost, { foreignKey: "newsPost_Id" });
    }
  };
  comment.init({
    user_Id: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    newPost_Id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};