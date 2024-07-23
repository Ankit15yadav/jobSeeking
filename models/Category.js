const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Jobs",
        }
    ]
})

module.exports = mongoose.model("Category", categorySchema);