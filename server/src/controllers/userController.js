const AnswerModel = require('../models/answerModel');
const QuestionModel = require('../models/questionModel');
const QuestionnaireModel = require('../models/questionnaireModel');
const UserModel = require('../models/userModel');

const sequelize = require('../database');
const bcrypt = require('bcrypt');

class UserController {
    async getUsers(req, res) {
        res.json({message : "GetUsers test reussi"});
    };
    async createUser(req, res) {
        res.json({message: "createUser test reussi"});
    };
    async updateUser(req, res) {
        res.json({message: "updateUser test reussi"});
    };
    async deleteUser(req, res) {
        res.json({message: "deleteUser test reussi"});
    };
};

module.exports = new UserController();