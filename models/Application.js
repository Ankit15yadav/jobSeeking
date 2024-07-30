const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs",
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    resume: {
        type: String,
        required: true, // Ensures that the application has a resume
    },
    coverLetter: {
        type: String,
    },
    dateApplied: {
        type: Date,
        default: Date.now(), // Automatically sets the application date to the current date
    },

    status: {
        type: String,
        enum: ["Pending", "Reviewed", "ShortListed", "Rejected"],
        default: "Pending",
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
})

module.exports = mongoose.model("Application", applicationSchema);