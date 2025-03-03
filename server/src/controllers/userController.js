const UserModel = require('../models/userModel');

const bcrypt = require('bcrypt');

class UserController {
    async getUserById(req, res) {
        res.json({message: "GetUserById test reussi"});
    };

    async getUsers(req, res) {
        try {
            const users = await UserModel.findAll();
            console.log(users);
            if(!users || users.length === 0){
                return res.json(message = "Pas de users trouvé");
            }
            
            /*const usersData = {
                user_id: users.dataValues.user_id,
                first_name: users.dataValues.first_name,
                last_name: users.dataValues.last_name,
                email: users.dataValues.email,
                role: users.dataValues.role
            };
            */
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    };
    async createUser(req, res) {
        const { first_name, last_name, email, password, role} = req.body;
        try {
            const saltRounds = 10;

            let hashedPassword = "";
            if (password) {
                hashedPassword = await bcrypt.hash(password, saltRounds);
            };

            const newUser = await UserModel.create({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
                role: role
            })
            let newuserData = {
                user_id: newUser.dataValues.user_id,
                first_name: newUser.dataValues.first_name,
                last_name: newUser.dataValues.last_name,
                email: newUser.dataValues.email,
                role: newUser.dataValues.role
            }
            res.status(201).json(newuserData)
        } catch (error) {
            res.status(500).json({ error : error.message});
        }
    };
    async updateUser(req, res) {
        res.json({message: "updateUser test reussi"});
    };
    async deleteUser(req, res) {
        res.json({message: "deleteUser test reussi"});
    };
};

module.exports = new UserController();