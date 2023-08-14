const { Workout, User, Exercise } = require('../models');

module.exports = {
    async logWorkout(req, res) {
        try {
            const workoutData = await Workout.create({
                ...req.body,
                user_id: req.session.userId
            });
            res.status(200).json(workoutData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async viewWorkouts(req, res) {
        try {
            const workouts = await Workout.findAll({
                where: { user_id: req.session.userId },
                include: [{ model: Exercise }]
            });
            res.status(200).json(workouts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async editWorkout(req, res) {
        try {
            const workoutData = await Workout.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            if (!workoutData[0]) {
                res.status(404).json({ message: 'No workout found with this id!' });
                return;
            }
            res.status(200).json(workoutData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async deleteWorkout(req, res) {
        try {
            const workoutData = await Workout.destroy({
                where: {
                    id: req.params.id
                }
            });
            if (!workoutData) {
                res.status(404).json({ message: 'No workout found with this id!' });
                return;
            }
            res.status(200).json(workoutData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    
};
