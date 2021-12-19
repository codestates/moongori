"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class newsPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.newsPost.belongsTo(models.user, { foreignKey: "user_Id" });
      models.newsPost.hasMany(models.comment, { foreignKey: "newsPost_Id" });
    }
  }
  newsPost.init(
    {
      category: DataTypes.STRING,
      content: DataTypes.TEXT,
      img: DataTypes.STRING,
      town: DataTypes.STRING,
      location: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
      user_Id: DataTypes.INTEGER,
      comment_cnt: { defaultValue: 0, type: DataTypes.INTEGER },
      view: { defaultValue: 0, type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "newsPost",
    }
  );
  return newsPost;
};
