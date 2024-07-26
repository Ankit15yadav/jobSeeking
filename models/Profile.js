const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender: {
        type: String,
        trim: true,
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },

})

module.exports = mongoose.model("Profile", profileSchema);