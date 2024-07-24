const express = require("express");
const app = express();

const database = require("./config/database");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4001;

database.connect();
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is running"
    })
})

app.listen(PORT, () => {
    console.log(`server is running at ${PORT} port number`)
})