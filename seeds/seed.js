const sequelize = require('../config/connection');
const { User, Workout, Exercise } = require('../models');

const userData = require('./userData.json');
const workoutData = require('./workoutData.json');
const exerciseData = require('./exerciseData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const workout of workoutData) {
      await Workout.create({
        ...workout,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    for (const exercise of exerciseData) {
      await Exercise.create({
        ...exercise,
        workout_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }
  
    process.exit(0);
  };
  
  seedDatabase();
