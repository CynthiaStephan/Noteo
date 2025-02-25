const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Question = sequelize.define('question', {
    question_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    question: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
});

module.exports = Question;