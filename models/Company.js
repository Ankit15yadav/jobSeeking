const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        //url of the web site
        required: true,
    },
    CompanyLogo: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    jobsCreated: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jobs",
        }
    ]

});

module.exports = new mongoose.model("Company", companySchema);