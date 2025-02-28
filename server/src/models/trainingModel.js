const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Training = sequelize.define('training', {
    formation_id: {
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
});

Training.associate = (models) => {
    Training.belongsToMany(models.user, {
        through: 'training_user',
        foreignKey: 'training_id'
    });
};

module.exports = Training;