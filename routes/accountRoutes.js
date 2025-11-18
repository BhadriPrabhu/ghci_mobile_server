import { getAccountDetails, getAccountBalance } from "../controllers/accountControllers.js";
import express from "express";

const router = express.Router();

router.post("/getAccountDetails",getAccountDetails);
router.post("/getAccountBalance",getAccountBalance);

export default router;