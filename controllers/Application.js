const Application = require("../models/Application");
const Jobs = require("../models/Jobs");
const Company = require("../models/Company");
const User = require("../models/User");
const { uploadImageToCloud } = require("../utils/imageUpload");
require("dotenv").config();

exports.createApplication = async (req, res) => {

    try {

        const { JobId, companyId } = req.body;
        const userId = req.user.id;

        console.log(userId)

        if (!JobId || !userId || !companyId) {
            return res.status(404).json({
                success: false,
                message: "ID's not found",
            })
        }

        const { name,
            status
        } = req.body;

        const resumeFile = req.files.resume;

        const uploadResume = await uploadImageToCloud(
            resumeFile,
            process.env.FOLDER_NAME,
        )
        // const base64Data1 = resumeFile.data.toString('base64');

        const coverletterFile = req.files.coverletter;
        const uploadCoverletter = await uploadImageToCloud(
            coverletterFile,
            process.env.FOLDER_NAME,
        )
        // const base64Data2 = coverletterFile.data.toString('base64');

        if (!name || !resumeFile || !coverletterFile
            || !status
        ) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        console.log("resume id", uploadResume.secure_url);

        const updateApplication = await Application.create({
            name,
            job: JobId,
            user: userId,
            resume: uploadResume.secure_url,
            coverLetter: uploadCoverletter.secure_url,
            status,
            company: companyId,
        })

        if (!updateApplication) {
            return res.status(400).json({
                success: false,
                message: "application cannot be updated",
            })
        }

        const updatedjob = await Jobs.findByIdAndUpdate(JobId,
            {
                $push: {
                    applications: updateApplication._id
                }
            },
            { new: true },
        )

        return res.status(200).json({
            success: true,
            message: "application created successfully",
            updatedjob,
            updateApplication,
        })

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "application cannot be created",
            error: err.message,
        })
    }
}