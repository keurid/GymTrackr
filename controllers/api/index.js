const router = require('express').Router();
const userRoutes = require('./UserController');
const workoutRoutes = require('./WorkoutController');
const exerciseRoutes = require('./ExerciseController');

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);
router.use('/exercises', exerciseRoutes);

module.exports = router;
