const router = require('express').Router();
const { Workout, User, Exercise } = require('../../models');

router.post('/', async(req, res)=> {
    console.log (req.body)
    try {
        const workoutData = await Workout.create({
            ...req.body,
           user_id: req.session.user_id,
        });
        res.status(200).json(workoutData);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.get('/', async(req, res) => {
    try {
        const workoutData = await Workout.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{ model: Exercise }]
        });
        res.status(200).json(workoutData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async(req, res) => {
    try {
        const workoutData = await Workout.addHook.update(req.body, {
            where: { id: req.params.id}
        });
        if(!workoutData[0]){
            res.status(404).json({ message: "workout not found!"});
            return;
        }
        res.status(200).json(workoutData);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', async(req, res) => {
    // delete on tag by its `id` value
    try {
      const deleteWorkout = await Workout.destroy({
        where: {id: req.params.id}
      });
      res.status(200).json({message: `${deleteWorkout} workouts deleted.`})
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  module.exports = router;