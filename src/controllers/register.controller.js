const User = require("../models/User");
const { default: APIError } = require("../Response/APIError");
const bcrypt = require("bcrypt");
const { default: APISuccess } = require("../Response/APISuccess");

const registerController = async (req, res) => {
    try {
        const { userId, password } = req.body;

        if(!userId || !password){
            return res.status(400).json(new APIError(400, "Please fill out all the fields"));
        }

        const existingUser = await User.findOne({ userId });

        if(existingUser){
            return res.status(409).json(new APIError(409, "User already exists. Please login"));
        }

        // Hash the password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userId,
            password: hashedPassword,
            isLoggedIn: false
        });

        await newUser.save();
        

        await sendWelcomeEmail(userId);

        // Return success response without password
        return res.status(201).json(new APISuccess(201, newUser, "User registered successfully"));
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json(new APIError(500, "Server error during registration"));
    }
};

module.exports = { registerController };