const bcrypt = require("bcrypt");
const { User } = require("../models/User");

const registerController = async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "Please fill out all the fields",
        error: "Missing fields",
        data: [],
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: "User already exists with same email",
        error: "User already exists",
        data: [],
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      status: 201,
      message: "User registered successfully",
      data: {
        firstName: newUser.firstName,
        email: newUser.email,
      },
      error: null,
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      status: 500,
      message: "Server error during registration",
      error: error.message || "Something went wrong",
      data: [],
    });
  }
};

module.exports = { registerController };
