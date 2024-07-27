const mongoose = require("mongoose");

const selectedSchema = new mongoose.Schema({

    selectedCandidates: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})