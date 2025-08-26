'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Card, Favourite }) {
      this.hasMany(Card, { foreignKey: 'authorId' });

      this.belongsToMany(Card, {
        through: Favourite,
        foreignKey: 'userId',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    },
  );
  return User;
};
