const { mongo, default: mongoose } = require("mongoose");
const Profile = require("../models/Profile");
const User = require("../models/User");
const jobs = require("../models/Jobs");
const Selected = require("../models/Selected");

exports.updateProfile = async (req, res) => {
    try {

        const {
            firstName = "",
            lastName = "",
            dateofBirth = "",
            about = "",
            phoneNumber = "",
            gender = "",
        } = req.body

        const id = req.user.id;

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "user details not found",
            })
        }

        const profileId = userDetails.additonalDetails || userDetails.additonalDetails._id;

        const profile = await Profile.findById(profileId);

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        })

        await user.save();

        profile.dateOfBirth = dateofBirth;
        profile.about = about;
        profile.gender = gender;
        profile.phoneNumber = phoneNumber;

        await profile.save();

        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            updatedUserDetails,
            message: "Profile updated successfully",
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            error: err.message,
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {

        const id = req.user.id;

        const user = await User.findById({ _id: id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }

        await Profile.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(user.additonalDetails),
        })


        // jobs k models mai se user nikal dia jo applied tha
        for (const jobsId of user.jobApplied) {
            await jobs.findByIdAndUpdate(
                jobsId,
                {
                    $pull: { applicants: id }
                },
                { new: true },
            )
        }

        //selected mai se bhi nikalna hai user ko
        // for (const selectId of user.jobSelected) {
        //     await Selected.findByIdAndUpdate(
        //         selectId,
        //         {
        //             $pull: {}
        //         }
        //     )
        // }

        //user ko delete kr do
        await User.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            messageL: "User cannot be deleted",
        })
    }
}


exports.getAllUserDetails = async (req, res) => {
    try {

        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetials")
            .exec();

        console.log(userDetails);
        return res.status(200).json({
            success: true,
            message: "user details fetched successfully",
            data: userDetails,
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}