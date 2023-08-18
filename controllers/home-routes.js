const router = require('express').Router();


router.get('/', async(req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.json('Render error');
    }
})

router.get('/login', async(req, res) => {
    try {
        res.render('login')
    } catch (error) {
        res.json('LOGIN render error')
    }
})

module.exports = router;