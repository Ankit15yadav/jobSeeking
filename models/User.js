const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    DateOfBirth: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Admin", "Employer", "JobSeeker"],
        default: "JobSeeker"
    },

    additonalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },

    jobApplied: [{
        type: mongoose.Schema.Types.Array.ObjectId,
        ref: "Jobs",
    }],

    jobSelected: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Selected"
        }
    ],

    token: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    }

},
    { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);