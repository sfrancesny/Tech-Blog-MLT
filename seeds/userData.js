// seeds\userData.js
import User from '../app/models/userModel.js';

const userData = [
  {
    username: 'Kem25',
    email: 'Kem.Nyenkan@gmail.com',
    password: 'password123',
  },
  {
    username: 'Khalassi25',
    email: 'mackeyk@gmail.com',
    password: 'passcode123',
  },
];

const seedUsers = async () => {
  try {
    await User.bulkCreate(userData);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

export default seedUsers;
