// seeds\commentData.js
  
import { Comment } from '../models';

const commentData = [
  { content: 'I love coding and learning about the newest technologies in Web Development.', userId: 1, postId: 1 },
  { content: 'I have always wanted to become a Full Stack Developer!', userId: 2, postId: 2 },
];

const seedComments = async () => {
  try {
    await Comment.bulkCreate(commentData);
    console.log('Comments seeded successfully!');
  } catch (error) {
    console.error('Error seeding comments:', error);
  }
};

export default seedComments;
