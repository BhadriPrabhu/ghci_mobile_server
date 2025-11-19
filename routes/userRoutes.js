import express from "express";
import { getUsers, getPassword } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/getUser", getUsers);
router.post("/getPassword", getPassword);

export default router;
