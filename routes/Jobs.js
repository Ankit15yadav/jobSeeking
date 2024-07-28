const express = require("express");
const router = express.Router();

const {
    createCompany,
    deleteCompany
} = require("../controllers/Company");

const {
    auth, isEmployer
} = require("../middlewares/auth");

router.post("/createCompany", auth, isEmployer, createCompany);
router.delete("/deleteCompany", auth, isEmployer, deleteCompany);

module.exports = router;