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

        const { email, password } = req.body;
        try {

            
            
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