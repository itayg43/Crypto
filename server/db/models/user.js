"use strict";

const { Model } = require("sequelize");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async hashPassword(plainPassword) {
      const salt = await bcryptjs.genSalt(10);
      return await bcryptjs.hash(plainPassword, salt);
    }

    async validatePassword(plainPassword) {
      return await bcryptjs.compare(plainPassword, this.password);
    }

    generateToken() {
      return jwt.sign(
        {
          id: this.id,
        },
        process.env.JWT_PRIVATE_KEY
      );
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
    }
  );
  return User;
};
