const { Exercise } = require('../models');

module.exports = {
    async addExercise(req, res) {
        try {
            const exerciseData = await Exercise.create({
                ...req.body,
                workout_id: req.params.workoutId
            });
            res.status(200).json(exerciseData);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async editExercise(req, res) {
        try {
            const exerciseData = await Exercise.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            if (!exerciseData[0]) {
                res.status(404).json({ message: 'No exercise found with this id!' });
                return;
            }
            res.status(200).json(exerciseData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteExercise(req, res) {
        try {
            const exerciseData = await Exercise.destroy({
                where: {
                    id: req.params.id
                }
            });
            if (!exerciseData) {
                res.status(404).json({ message: 'No exercise found with this id!' });
                return;
            }
            res.status(200).json(exerciseData);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};
