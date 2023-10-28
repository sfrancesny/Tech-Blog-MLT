import { sync } from '../config/dbConfig';
import { bulkCreate } from '../models/userModel';
import { bulkCreate as _bulkCreate } from '../models/postModel';
import { bulkCreate as __bulkCreate } from '../models/commentModel';
import userData from './userData';
import postData from './postData';
import commentData from './commentData';

const seedDatabase = async () => {
  await sync({ force: true });

  await bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await _bulkCreate(postData, {
    returning: true,
  });

  await __bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
