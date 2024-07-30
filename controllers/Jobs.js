const Company = require("../models/Company");
const User = require("../models/User");
const Jobs = require("../models/Jobs");
const { updateCompany } = require("./Company");

exports.createJob = async (req, res) => {

    try {

        //use param
        // {} ye bracket nhi lgaya tha to error aaya
        const { companyId } = req.body;

        let { title, description, requirements,
            salary, location, industry, deadline
        } = req.body;

        if (!title || !description || !requirements || !salary || !location ||
            !industry || !deadline
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