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
},{
    tableName: 'questionnaire',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
});

Questionnaire.associate = (models) => {
    // Vers User
    Questionnaire.belongsTo(models.user, {
        foreignKey: 'user_id'
    });
    Questionnaire.belongsToMany(models.user, {
        through: 'questionnaire_user',
        foreignKey: 'questionnaire_id',
    });
    // Vers Question
    Questionnaire.hasMany(models.question, {
        foreignKey: 'questionnaire_id',
    });
};

module.exports = Questionnaire;