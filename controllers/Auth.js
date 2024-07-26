const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");


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
                message: "User already exist .please login to continue",
            })
        }

        //find the most recent otp from the database
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response);

        if (response.length === 0) {
            return res.status(400).json({
                success: false,
                message: "The otp is not present",
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

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "user cannot be registered . please try again",
        })
    }
}

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill up all the required fields",
            });
        }

        const user = await User.findOne({ email }).populate("additonalDetails");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registerd with us please sing up to continue!!1"
            })
        }

        //hum token create krenge using jwt.sign
        // jwt sign mai payload secretkry aur options pass krne hote hai
        // direct function mai b pass kr skte aur object bna kr b kr skte hai
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id, role: user.role },
                process.env.JWT_SECRET,
                {
                    expiresIn: "48h",
                }
            );

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User login successfully",
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            })
        }

    } catch (err) {

        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Login failure please try again",
        })
    }
}

exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;
        //user present hai ya nhi

        const userPresent = await User.findOne({ email });

        if (userPresent) {
            return res.status(401).json({
                success: false,
                message: "user Already registered",
            })
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const result = await OTP.findOne({ otp: otp });
        console.log("result is generated");
        console.log("OTP", otp);
        console.log("result", result);
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            })
        }

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);

        console.log("otp body", otpBody);
        return res.status(200).json({
            success: true,
            message: "otp sent successfully",
            otp,
        })

    } catch (err) {
        console.log(err.message);
        return res.status(500).json(
            {
                success: false,
                error: err.message,
            }
        )
    }
}