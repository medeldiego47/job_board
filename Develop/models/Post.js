//job posting model
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posting extends Model {}

Posting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }},
    contact_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    pay: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_email: {
      type: DataTypes.STRING,
      allowNull:false
    }
      }
    ,
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Posting;
