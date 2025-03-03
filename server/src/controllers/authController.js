const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

class AuthController{
    
    async login(req, res){

        const { email, password } = req.body;

        try{
            const user = await UserModel.findOne({ where: { email: email } });
            console.log(user)
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ message: "Wrong email or password" });
            }
            console.log("JWT_SECRET:", process.env.JWT_SECRET);
            const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
            console.log(`Token: ${token}`)
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
              });
            res.json({
                id: user.user_id,
                role: user.role,
            })

        } catch(error){
            res.status(500).json({ error : error.message });
        }
    }

    async register(req, res){

        const { first_name, last_name, email, password, role  } = req.body;

        try {
            const saltRounds = 10;

            let hashedPassword = "";
            if (password) {
                hashedPassword = await bcrypt.hash(password, saltRounds);
            }

            const newUser = await UserModel.create({ 
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword,
                    role: role,
                },
            );
            let newuserData = {
                user_id: newUser.dataValues.user_id,
                first_name: newUser.dataValues.first_name,
                last_name: newUser.dataValues.last_name,
                email: newUser.dataValues.email,
                role: newUser.dataValues.role

            }
            res.status(201).json(newuserData)
            
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    }

    async logout(req, res) {
        try {
            if (!req.cookies.token) {
                return res.status(400).json({ message: "You're already logout" });
            }
            res.cookie("token", "", {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                expires: new Date(0),
            });
    
            res.json({ message: "Successfully logged out" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AuthController();