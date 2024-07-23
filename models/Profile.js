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
        type: string,
        trim: true,
    },

})

module.exports = mongoose.model("Profile", profileSchema);