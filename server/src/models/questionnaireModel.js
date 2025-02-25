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
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    tableName: 'questionnaire',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

module.exports = Questionnaire;