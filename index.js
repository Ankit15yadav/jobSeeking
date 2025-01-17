const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const jobRoutes = require("./routes/Jobs");

const database = require("./config/database");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload");
// without bracket ye ek func ki trh treat nhi hoga
const { cloudinaryConnect } = require("./config/cloudinary");

dotenv.config();
const PORT = process.env.PORT || 4001;

database.connect();

app.use(express.json());
app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
)

//cloud connect
cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/jobs", jobRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is running"
    })
})

app.listen(PORT, () => {
    console.log(`server is running at ${PORT} port number`)
})