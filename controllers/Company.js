const Company = require("../models/Company");
const User = require("../models/User");
const { uploadImageToCloud } = require("../utils/imageUpload");
require("dotenv").config();

exports.createCompany = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "company user not found",
            })

        }
        let {
            name, description, location, industry, website
        } = req.body;

        const logo = req.files.companyLogo;


        if (!name || !description || !location || !industry || !website || !logo) {
            return res.status(400).json({
                success: false,
                message: "All fields are required to create a company on this website",
            })
        }

        //cloud pr image upload krna hai thumbnail ka
        const uploadImg = await uploadImageToCloud(
            logo,
            process.env.FOLDER_NAME
        )

        console.log("image uploaded", uploadImg.secure_url);

        console.log("website name ", website);

        const newcompany = await Company.create({
            name,
            description,
            location,
            industry,
            website,
            CompanyLogo: uploadImg.secure_url,
        })

        return res.status(200).json({
            success: true,
            message: "company created successfully",
            newcompany,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Company cannot be created"
        })

    }
}

exports.deleteCompany = async (req, res) => {
    try {

        // baadme parameters se le lunga iski id
        const { companyId } = req.body;

        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "compnay id not found",
            })
        }

        await Company.findByIdAndDelete(companyId);

        return res.status(200).json({
            success: true,
            message: "Company deleted successfully",
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Company cannot be deleted "
        })
    }
}

exports.updateCompany = async (req, res) => {
    try {

        // company id ko form data mai bhi bhej skta hu 
        const { companyId } = req.body;

        if (!companyId) {
            return res.status(400).json({
                success: false,
                message: "id not found",
            })
        }

        let { name, description, location, industry, website } = req.body;

        if (!name || !description || !location || !industry || !website) {
            return res.status(400).json({
                success: false,
                message: "all fields are required",
            })
        }

        const newCompany = await Company.findByIdAndUpdate({ _id: companyId },
            {
                $set: {
                    name,
                    description,
                    location,
                    industry,
                    website,
                }
            },
            { new: true },
        )
        if (!newCompany) {
            return res.status(404).json({
                success: false,
                message: "company not found",
            })
        }

        console.log(newCompany);

        return res.status(200).json({
            success: true,
            message: "company updated successfully",
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "error in updating company",
        })
    }
}