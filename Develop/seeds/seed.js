const sequelize = require('../config/connection');
const { User, Posting } = require('../models');
//edit this code to match post and user data this is all copy paste
const userData = require('./userData.json');
const postingData = require('./post..json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postingData) {
    await Posting.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
