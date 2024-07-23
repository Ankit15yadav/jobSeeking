const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    requirements: {
        type: String,
    },
    salary: {
        type: String,
    },
    location: {
        type: String,
    },
    industry: {
        type: String,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Company",
    },
    DatePosted: {
        type: Date,
        default: Date.now(),
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    deadLine: {
        type: Date,
        required: true,
    },

    typeOfJob: {
        type: String,
        enum: ["full time", "part time", "remote", "internship"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    }

});

module.exports = mongoose.model("Jobs", jobsSchema);