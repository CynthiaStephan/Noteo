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
}, {
    timestamps: true,
    tableName: 'question',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

Question.associate = (models) => {
    // Vers Questionnaire
    Question.belongsToMany(models.questionnaire, {
        through: 'questionnaire_question',
        foreignKey: 'question_id',
        otherKey: 'questionnaire_id'
    });
    // Vers Answer
    Question.belongsToMany(models.answer, {
        through: 'answer_question',
        foreignKey: 'question_id',
        otherKey: 'answer_id'
    });
};

module.exports = Question;