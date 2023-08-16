const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Exercise extends Model {   }

Exercise.init({
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
    muscle_group: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    videoUrl: DataTypes.STRING,
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'exercise',
  });

module.exports = Exercise;