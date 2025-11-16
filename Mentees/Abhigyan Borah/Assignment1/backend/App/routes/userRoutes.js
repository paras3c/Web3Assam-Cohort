const express = require("express");
const router = express.Router();
const { getUsers, createUser } = require("../controllers/userController");
const validateUser = require("../middleware/validateUser");

router.get("/", getUsers);   
router.post("/", validateUser, createUser);   

module.exports = router;
