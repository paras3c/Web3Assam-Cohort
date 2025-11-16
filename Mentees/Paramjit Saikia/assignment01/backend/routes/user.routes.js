import express from "express";
import { register, getUser, updateUser } from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.get("/get", getUser);
router.put("/update", updateUser);

export default router;