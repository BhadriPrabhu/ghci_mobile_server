import express from "express";
import { getUsers, getPassword, searchUser } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/getUser", getUsers);
router.post("/getPassword", getPassword);
router.post("/searchUser", searchUser);

export default router;
