import sequelize from '../config/dbConfig.js';
import User from '../app/models/userModel.js';
import Post from '../app/models/postModel.js';
import Comment from '../app/models/commentModel.js';
import userData from './userData.js';
import postData from './postData.js';
import commentData from './commentData.js';

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    await Post.bulkCreate(postData, {
      returning: true,
    });

    await Comment.bulkCreate(commentData, {
      returning: true,
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding the database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
