import express from "express";
import { getUsers } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/getUser", getUsers);

export default router;
