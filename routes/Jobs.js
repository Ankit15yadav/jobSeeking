const express = require("express");
const router = express.Router();

const {
    createCompany,
    deleteCompany,
    updateCompany
} = require("../controllers/Company");

const {
    auth, isEmployer
} = require("../middlewares/auth");

router.post("/createCompany", auth, isEmployer, createCompany);
router.delete("/deleteCompany", auth, isEmployer, deleteCompany);
router.post("/updateCompany", auth, isEmployer, updateCompany);

module.exports = router;