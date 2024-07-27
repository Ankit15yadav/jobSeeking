const Company = require("../models/Company");
const User = require("../models/User")


exports.createCompany = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "user not found",
            })
        }
        let {
            name, description, location, industry, website
        } = req.body;

        const logo = req.files.thumbnail;

        //neeche logo bhi include krna hai validation k lie
        if (!name || !description || !location || !industry || !website) {
            return res.status(400).json({
                success: false,
                message: "All fields are required to create a company on this website",
            })
        }

        //cloud pr image upload krna hai thumbnail ka
        const newcompany = await Company.create({
            name,
            description,
            location,
            industry,
            website,
        })


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Company cannot be created"
        })

    }
}