const mongoose = require("mongoose");

const selectedSchema = new mongoose.Schema({

    selected: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobs"
    }
})