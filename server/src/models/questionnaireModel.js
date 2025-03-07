const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Questionnaire = sequelize.define('questionnaire', {
    questionnaire_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
},{
    tableName: 'questionnaire',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

Questionnaire.associate = (models) => {
    // Vers User
    Questionnaire.belongsTo(models.user, {
        foreignKey: 'user_id',
        otherKey: 'user_id'
    });
    Questionnaire.belongsToMany(models.user, {
        through: 'questionnaire_user',
        foreignKey: 'questionnaire_id',
        otherKey: 'user_id',
        as: "assigned_users", 
    });
    // Vers Question
    Questionnaire.belongsToMany(models.question, {
        through: 'questionnaire_question',
        foreignKey: 'questionnaire_id',
        otherKey: 'question_id'
    });
};

module.exports = Questionnaire;