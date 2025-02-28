const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        isEmail: true,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM(),
        values: ['intern', 'trainer', 'admin'],
        defaultValue: 'intern',
        allowNull: false,
    },

},{
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

User.associate = (models) => {
    User.belongsToMany(models.trainning, {
        through: 'training_user',
        foreignKey: 'user_id'
    });
    User.belongsToMany(models.answer, {
        through: 'answer_user',
        foreignKey:'user_id'
    });
    User.belongsToMany(models.questionnaire, {
        through: 'questionnaire_user',
        foreignKey: 'user_id'
    });
    User.hasMany(models.questionnaire, {
        foreignKey: 'user_id'
    });
};

module.exports = User;