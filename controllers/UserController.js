const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    async register(req, res) {
        try {
            const userData = await User.create(req.body);
            req.session.save(() => {
                req.session.userId = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;
                res.status(200).json(userData);
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({ where: { email: req.body.email } });
            if (!user) {
                res.status(400).json({ message: 'No user account found!' });
                return;
            }

            const validPassword = await bcrypt.compare(req.body.password, user.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Incorrect password!' });
                return;
            }

            req.session.save(() => {
                req.session.userId = user.id;
                req.session.username = user.username;
                req.session.loggedIn = true;
                res.json({ user, message: 'You are now logged in!' });
            });

        } catch (err) {
            res.status(500).json(err);
        }
    },

    logout(req, res) {
        if (req.session.loggedIn) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(404).end();
        }
    }
};
