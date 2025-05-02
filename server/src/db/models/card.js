'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate({ User, Favourite }) {
      this.belongsTo(User, { foreignKey: 'authorId' });

    this.belongsToMany(User, {
      through: Favourite,     // Промежуточная таблица
      foreignKey: 'cardId',   // Поле в Favorite, ссылающееся на Tea
    });
  }
}
  Card.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      authorId: { 
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'Users',
              key: 'id'
          }
      },
      price:DataTypes.INTEGER,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Card',
    }
  );
  return Card;
};
