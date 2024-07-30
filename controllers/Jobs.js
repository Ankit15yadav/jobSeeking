const Company = require("../models/Company");
const User = require("../models/User");
const Jobs = require("../models/Jobs");
const { updateCompany } = require("./Company");
const { mongoose } = require("mongoose");

exports.createJob = async (req, res) => {

    try {

        //use param
        // {} ye bracket nhi lgaya tha to error aaya
        const { companyId } = req.body;

        let { title, description, requirements,
            salary, location, industry, deadline, typeOfJob,
        } = req.body;

        if (!title || !description || !requirements || !salary || !location ||
            !industry || !deadline || !typeOfJob
        ) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        const parsedDeadLine = new Date(deadline);
        if (isNaN(parsedDeadLine.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid deadline date",
            })
        }

        const job = await Jobs.create({
            title,
            description,
            requirements,
            salary,
            location,
            industry,
            deadLine: parsedDeadLine,
            company: companyId,
            typeOfJob,
        })

        const updatedCompany = await Company.findByIdAndUpdate({ _id: companyId },
            {
                $push: {
                    jobsCreated: job._id,
                }
            },
            { new: true },
        ).populate("jobsCreated").exec();

        console.log(updatedCompany);

        return res.status(200).json({
            success: true,
            message: "Job created successfully",
            job,
            updatedCompany,
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "jobs cannot be created",
            error: err.message,
        })
    }
}

exports.updateJob = async (req, res) => {

    try {

        const { companyId, jobId } = req.body;

        if (!companyId || !jobId) {
            return res.status(404).json({
                success: false,
                message: "id not found",
            })
        }

        let { title, description, requirements,
            salary, location, industry, deadline, typeOfJob,
        } = req.body;

        if (!title || !description || !requirements || !salary || !location ||
            !industry || !deadline || !typeOfJob
        ) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }

        const parsedDeadLine = new Date(deadline);
        if (isNaN(parsedDeadLine.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid deadline date",
            })
        }

        const updatedjob = await Jobs.findByIdAndUpdate({ _id: jobId },
            {
                $set: {
                    title,
                    description,
                    requirements,
                    salary,
                    location,
                    industry,
                    deadLine: parsedDeadLine,
                    company: companyId,
                    typeOfJob,
                }
            },
            {
                new: true,
            }
        )

        return res.status(200).json({
            success: true,
            message: "job updated successfully",
            updatedjob,
        })

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "jobs cannot be updated",
            error: err.message,
        })
    }
}

exports.deleteJob = async (req, res) => {
    try {

        const { jobId, companyId } = req.body;

        if (!jobId || !companyId) {
            return res.status(404).json(
                {
                    success: false,
                    message: "id's not found",
                }
            )
        }

        const findJob = await Jobs.findById(jobId);

        if (!findJob) {
            return res.status(404).json({
                success: false,
                message: "job not found with particular id",
            })
        }

        //removed job from company schema
        const updateCompany = await Company.findByIdAndUpdate(companyId,
            {
                $pull: {
                    jobsCreated: jobId,
                }
            },
            { new: true },
        ).lean();


        // Use lean():

        // When calling findByIdAndUpdate, I've added .lean(), which converts the Mongoose document into a plain JavaScript object, removing any circular references that Mongoose might have internally.
        // This is crucial when you're sending the updated document back as a JSON response.

        if (!updateCompany) {
            return res.status({
                success: false,
                message: "company cannot be updated",
            })
        }

        //delete job from job schema
        await Jobs.findByIdAndDelete(jobId);

        return res.status(200).json({
            success: true,
            message: "job deleted successfully",
            updatedCompany: updateCompany,
        })


    } catch (err) {

        return res.status(500).json(
            {
                success: false,
                message: "job cannot be deleted",
                error: err.message,
            }
        )
    }
}