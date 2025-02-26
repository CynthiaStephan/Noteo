const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Answer = sequelize.define('answer', {
    answer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    answer: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
},{
    tableName: 'answer',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

Answer.associate = (models) => {
    Answer.belongsToMany(models.user, { 
        through: 'answer_user',
        foreignKey: 'answer_id'
    });
    Answer.belongsToMany(models.question, {
        through: 'answer_question',
        foreignKey: 'answer_id'
    });
};

module.exports = Answer;