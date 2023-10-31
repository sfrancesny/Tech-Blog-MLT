// app\models\postModel.js

import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/dbConfig.js';

class Post extends Model {}

Post.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // 'users' refers to table name
        key: 'id', // 'id' refers to column name in persons table
      },
    },
  },
  {
    // additional model options
    sequelize, // pass the connection instance
    modelName: 'Post', // the model name
  }
);

export default Post;
