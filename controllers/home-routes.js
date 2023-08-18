const { Workout, User, Exercise } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');


router.get('/', async(req, res) => {
    if (req.session.loggedIn){
        res.redirect('/profile');
        return;
    }
    res.render('register')
});

router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Workout }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

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