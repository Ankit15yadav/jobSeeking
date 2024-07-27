const express = require("express");
const app = express();

const database = require("./config/database");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");


dotenv.config();
const PORT = process.env.PORT || 4001;

database.connect();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is running"
    })
})

app.listen(PORT, () => {
    console.log(`server is running at ${PORT} port number`)
})