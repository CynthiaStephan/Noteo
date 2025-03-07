const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Training = sequelize.define('training', {
    training_id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: false,
    tableName: 'training',
});

Training.associate = (models) => {
    Training.belongsToMany(models.user, {
        through: 'training_user',
        foreignKey: 'training_id',
        otherKey: 'user_id'
    });
};

module.exports = Training;