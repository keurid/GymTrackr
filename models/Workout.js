const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Workout = sequelize.define('Workout', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    date: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
});

module.exports = Workout;