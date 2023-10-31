// seeds\postData.js

import { Post } from '../models';

const postData = [
  {
    title: 'Getting Started in Web Development',
    content: 'Learning about Web Development can be beneficial...',
    userId: 1, // Changed from user_id to userId
  },
  {
    title: 'The Full Stack',
    content: 'Full Stack Development refers to the end-to-end application software development, including the front end and the back end...',
    userId: 2, // Changed from user_id to userId
  },
];

const seedPosts = async () => {
  try {
    await Post.bulkCreate(postData);
    console.log('Posts seeded successfully!');
  } catch (error) {
    console.error('Error seeding posts:', error);
  }
};

export default seedPosts;
