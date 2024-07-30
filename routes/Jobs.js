const express = require("express");
const router = express.Router();

const {
    createCompany,
    deleteCompany,
    updateCompany
} = require("../controllers/Company");

const {
    createJob
} = require("../controllers/Jobs");

const {
    auth, isEmployer, isJobSeeker
} = require("../middlewares/auth");

router.post("/createCompany", auth, isEmployer, createCompany);
router.delete("/deleteCompany", auth, isEmployer, deleteCompany);
router.post("/updateCompany", auth, isEmployer, updateCompany);
router.post("/createJob", auth, isEmployer, createJob);

module.exports = router;