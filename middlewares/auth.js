const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    try {

        const token = req.cookies.token ||
            req.body.token || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token is missing",
            })
        }

        try {

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            })
        }

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "something went wrong while validating the token",
        })
    }
}


//employer
exports.isEmployer = async (req, res, next) => {
    try {

        if (req.user.accountType !== "Employer") {
            return res.status(401).json({
                success: false,
                message: "this is a protected route for employer only",
            })
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "user cannot be verifited , please try again",
        })
    }
}

//jobSeeker
exports.isJobSeeker = async (req, res, next) => {
    try {

        if (req.user.accountType !== "JobSeeker") {
            return res.status(401).json({
                success: false,
                message: "this is a protected route for jobSeeker only",
            })
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "user cannot be verifited , please try again",
        })
    }
}

//admin
exports.isEmployer = async (req, res, next) => {
    try {

        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "this is a protected route for Admin only",
            })
        }
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "user cannot be verifited , please try again",
        })
    }
}

