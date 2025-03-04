const UserModel = require('../models/userModel');

const bcrypt = require('bcrypt');

class UserController {
    async getUserById(req, res) {
        const { user_id } = req.params;

        try {
            const user = await UserModel.findByPk(user_id, {
                attributes: { exclude: "password"},
            })
            if (!user || user.length === 0) {
                return res.status(404).json({error: "Pas de user trouvé"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };
    async getUsers(req, res) {
        try {
            const users = await UserModel.findAll({
                attributes: { exclude: "password"}
            });
            console.log(users);
            if(!users || users.length === 0){
                return res.json(message = "Pas de users trouvé");
            }
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
        const { user_id } = req.params;
        const { first_name, last_name, email, password, role } = req.body;
        try {
            const saltRounds = 10;
            
            let hashedPassword = "";
            if (password) {
                hashedPassword = await bcrypt.hash(password, saltRounds);
            };
            
            const updatedData = {};
            if (first_name) updatedData.first_name = first_name;
            if (last_name) updatedData.last_name = last_name;
            if (email) updatedData.email = email;
            if (password) updatedData.password = hashedPassword;
            if (role) updatedData.role = role;

            const [updatedUser] = await UserModel.update(updatedData, { where: {user_id: user_id} });
            console.log(updatedUser);
            
            if (updatedUser === 0) {
                return res.status(404).json({error: "Aucun utilisateur trouvé"});
            };
            res.status(200).json({message: "Utilisateur mis à jour"});
        } catch (error) {
            res.status(500).json({error: error.message});
        };
    };
    async deleteUserById(req, res) {
        const { user_id } = req.params;

        try {
            const deletedUser = await UserModel.destroy({where: {user_id: user_id} });
            console.log(deletedUser);
            
            
            if (deletedUser === 0) {
                return res.status(404).json({ error: "Aucun utilisateur trouvé"});
            }
            res.status(200).json({message: "Utilisateur supprimé"});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    };
};

module.exports = new UserController();