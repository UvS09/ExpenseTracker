const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const loginController = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 400,
            message: "Please fill out all the fields",
            data: [],
            error: "Missing fields",
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                status: 404,
                message: "User not found",
                data: [],
                error: "User does not exist",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(403).json({
                status: 403,
                message: "Unauthorized",
                data: [],
                error: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                email: existingUser.email,
                id: existingUser._id,
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '2d' }
        );

        return res.status(200).json({
            status: 200,
            message: "Login successful",
            data: {
                firstName: existingUser.firstName,
                email: existingUser.email,
                token: token,
            },
            error: null,
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            data: [],
            error: error.message || "Something went wrong",
        });
    }
};

module.exports = { loginController };
