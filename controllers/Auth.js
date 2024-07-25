const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const profile = require("../models/Profile");
require("dotenv").config();
const mailSender = require("../utils/mailSender");


//sign up controller
exports.signup = async (req, res) => {
    try {

        const { firstName, lastName,
            email, password, confirmPassword,
            accountType, phoneNumber, otp,
        } = req.body;

        //validation
        if (!firstName || !lastName ||
            !email || !password || !confirmPassword || !accountType
            || !phoneNumber || !otp
        ) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match please check again!"
            })
        }

        //user firse to nhi bna rha id same email se
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist .please sing in to continue",
            })
        }

        //find the most recent otp from the database


    } catch (err) {

    }
}