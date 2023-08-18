const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./controllers')
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // JSON parsing
app.use(express.urlencoded({ extended: false })); // URL-encoded parsing
app.use(express.static(path.join(__dirname, 'public'))); // Static files

// Handlebars configuration
const hbs = exphbs.create()
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
app.use (routes)

// Start the server after syncing the database
sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
