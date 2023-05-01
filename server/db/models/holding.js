"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Holding extends Model {}
  Holding.init(
    {
      uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Holding",
      tableName: "holdings",
      timestamps: false,
    }
  );
  return Holding;
};
