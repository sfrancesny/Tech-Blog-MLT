// app\models\commentModel.js

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

class Comment extends Model {}

Comment.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', // 'users' refers to table name
        key: 'id', // 'id' refers to column name in persons table
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post', // 'posts' refers to table name
        key: 'id', // 'id' refers to column name in persons table
      },
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Comment', // We need to choose the model name
  }
);

export default Comment;
