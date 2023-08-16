const router = require('express').Router();
const { where } = require('sequelize');
const { Exercise } = require('../../models');

router.post('/', async (req, res) =>{
    try {
        const exerciseData = await Exercise.create({...req.body, workout_id: req.params.workout_id,});
        res.status(200).json(exerciseData);
        
    } catch (error) {
        res.status(400).json(error);
    }
})

router.put('/:id', async(req, res)=>{
    try {
        const exerciseData = await Exercise.update(req.body, {
            where: {
            id: req.params.id
            }
        });
        if(!exerciseData[0]) {
            res.status(404).json({ message: 'No exercise found with this id!'});
            return;
        }
            res.status(200).json(exerciseData);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const exerciseData = await Exercise.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (!exerciseData) {
            res.status(404).json({ message: "No exercise found with this id!" });
            return;
        }
        res.status(200).json(exerciseData);
    
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;