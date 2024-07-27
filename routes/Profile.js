const express = require("express");
const router = express.Router();

const { deleteAccount, updateProfile, getAllUserDetails } = require("../controllers/Profile");
const { auth, isEmployer, isJobSeeker, isAdmin } = require("../middlewares/auth");

router.delete("/deleteProfile", auth, deleteAccount);

module.exports = router;