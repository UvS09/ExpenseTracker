const User = require("../models/User");
const { default: APIError } = require("../Response/APIError");
const { default: APISuccess } = require("../Response/APISuccess");
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
    
    const userId = req.body.userId;
    const password = req.body.password;

    if(!userId || !password){
        return res.status(400).json(new APIError(400,"Please fill out all the fields"));
    }

    try {
        const existingUser = await User.findOne({
            userId : userId
        });
    
        if(!existingUser){
            return res.status(404).json(new APIError(404,"User not found"));
        }
    
        if(existingUser.isLoggedIn === true){
            return res.status(400).json(new APIError(400, "ID already logged in from another device"));
        }
        
        // Compare the password with hashed password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
        if(!isPasswordValid){
            return res.status(403).json(new APIError(403, "Unauthorized"));
        }
    
        existingUser.isLoggedIn = true;
        await existingUser.save();
    
        return res.status(200).json(new APISuccess(200, existingUser, "Logged in successfully"));
    } catch (error) {
        console.error("Error : ", error);
        return res.status(500).json(new APIError(500, "Internal Server Error"));
    }
}

module.exports = { loginController };