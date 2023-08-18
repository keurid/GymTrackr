const { Workout, User, Exercise } = require('../models');
const router = require('express').Router();

router.get('/', async(req, res) => {
    try {
        res.render('register')
    } catch (error) {
        res.json('LOGIN render error')
    }
})

router.get('/workouts', async(req, res) => {
    try {
        const dbWorkoutData = await Workout.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id','username'],
                },
            ],
        });
        const workout = dbWorkoutData.map((workout) => 
        workout.get({ plain: true})
        );
        // session set up
        req.session.save(() => {
            if (req.session.countVisit) {
                req.session.countVisit++;
            } else{
                req.session.countVisit = 1;
            }  
            
            res.render('workoutList', {
                workout,
                countVisit: req.session.countVisit,
                loggedIn: req.session.loggedIn,
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json('Render error');
    }
});

module.exports = router;