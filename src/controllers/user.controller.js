const User = require('../models/user.model'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  
const SECRET_KEY = "your_secret_key";

exports.createUser = async  (req, res) =>{
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).send({ error: true, message: 'Please provide all required fields' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;

        const newUser = new User(req.body);    
        const user = await User.createUserQuery(newUser);
        
        res.status(201).json({
            error: false,
            message: "User added successfully!",
            data: user
        });
    } catch (error) {
        console.error("Error creating user:", error.message); 
        res.status(500).send({ error: true, message: "Internal Server Error" });
    }
};


exports.loginUser = async (req, res)=> {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: true, message: 'Please provide email and password' });
        }

        const user = await User.getUserByEmailQuery(email);
        
        if (!user) {
            return res.status(404).send({ error: true, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ error: true, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({
            error: false,
            message: "Login successful",
            token: token,
        });
    } catch (error) {
        console.error("Error during login:", error.message); 
        res.status(500).send({ error: true, message: "Error processing login" });
    }
};
