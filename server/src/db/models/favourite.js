'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    static associate({ User, Card }) {
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
      this.belongsTo(Card, {
        foreignKey: 'cardId',
      });
    }
  }
  Favourite.init(
    {
      userId: DataTypes.INTEGER,
      cardId: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Favourite',
      tableName: 'Favourites',
    },
  );
  return Favourite;
};
