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

Question.associate = (models) => {
    // Vers Questionnaire
    Question.belongsTo(models.questionnaire, {
        foreighKey: 'questionnaire_id',
    });
    // Vers Answer
    Question.belongsToMany(models.answer, {
        through: 'answer_question',
        foreignKey: 'question_id',
    });
};

module.exports = Question;