const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const profile = require("../models/Profile");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");


//sign up controller
exports.signup = async (req, res) => {
    try {

        const { firstName, lastName,
            email, password, confirmPassword,
            role, phoneNumber, otp,
        } = req.body;

        //validation
        if (!firstName || !lastName ||
            !email || !password || !confirmPassword || !role
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
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response);

        if (response.length === 0) {
            return res.status(400).json({
                success: false,
                message: "The otp is not valid",
            });
        }
        else if (otp !== response[0].otp) {
            //otp valid ni h
            return res.status(400).json({
                success: false,
                message: "the otp is not valid",
            })
        }

        //hashing password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);;

        //personal details ko default null set kr dia hai baadme change kr skte hai as per our need
        const profiledetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            phoneNumber: null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            role: role,
            additonalDetails: profiledetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

    } catch (err) {

    }
}