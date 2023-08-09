const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Exercise = sequelize.define('Exercise', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    workout_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'workout',
            key: 'id',
        },
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    muscleGroup: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
});

module.exports = Exercise;