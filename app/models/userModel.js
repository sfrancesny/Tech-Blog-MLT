// app\models\userModel.js

import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // additional model options g
    sequelize, // pass the connection instance
    modelName: 'User', // the model name
    tableName: 'users', // tables name 
    timestamps: false,
  }
);

export default User;
