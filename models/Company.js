const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    industry: {
        type: String,
    },
    website: {
        type: String,
        //url of the web site
    },
    logo: {
        type: String,
        required: true,
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Application"
        }
    ],

    jobsCreated: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jobs",
        }
    ]

});

module.exports = new mongoose.model("Company", companySchema);