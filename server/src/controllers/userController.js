const UserModel = require('../models/userModel');

class UserController {
    async getUserById(req, res) {
        res.json({message: "GetUserById test reussi"});
    };
    async getUsers(req, res) {
        res.json({message : "GetUsers test reussi"});
    };
    async createUser(req, res) {
        const user = await UserModel.create({
            first_name: "test",
            last_name: "test",
            email: "teihihihst@gmail.com",
            password: "test"
        });
        res.json({
            message: "createUser test reussi",
            user: user
        });
    };
    async updateUser(req, res) {
        res.json({message: "updateUser test reussi"});
    };
    async deleteUser(req, res) {
        res.json({message: "deleteUser test reussi"});
    };
};

module.exports = new UserController();