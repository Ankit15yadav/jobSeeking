const express = require("express");
const router = express.Router();

const {
    createCompany,
    deleteCompany,
    updateCompany
} = require("../controllers/Company");

const {
    createJob,
    updateJob,
    deleteJob
} = require("../controllers/Jobs");

const {
    createApplication,
} = require("../controllers/Application");

const {
    auth, isEmployer, isJobSeeker
} = require("../middlewares/auth");

router.post("/createCompany", auth, isEmployer, createCompany);

router.delete("/deleteCompany", auth, isEmployer, deleteCompany);

router.post("/updateCompany", auth, isEmployer, updateCompany);

router.post("/createJob", auth, isEmployer, createJob);

router.post("/updateJob", auth, isEmployer, updateJob);

router.delete("/deleteJob", auth, isEmployer, deleteJob);

router.post("/createApplication", auth, isEmployer, createApplication);

module.exports = router;