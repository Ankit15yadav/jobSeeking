const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");


const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Data.now(),
        expires: 60 * 5 //5 min ka time hai apne aap delte ho jaega us k baad
    }

})

async function sendVerificationEmail(email, otp) {

    try {

        const mailResponse = await mailSender(
            email,
            "otp verification email",
            otp,
        );
        console.log("Email sent successfully", mailResponse.response);

    } catch (err) {
        console.log("Error occured while sending email")
        throw err;
    }

}

//database mai save hone se phle emmail send kro agr match hua to save kro nhi to kuch mnhi hoga
otpSchema.pre("save", async function (next) {

    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }

    console.log("new document is saved to database");

    next();
    // call next middleware or just complete the execution
})

//main sending ka function schema k baad aur export se phle likhna hota hai mongoose.model se phole

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;