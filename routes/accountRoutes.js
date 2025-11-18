import { getAccountDetails, getAccountBalance, getAccountNumber } from "../controllers/accountControllers.js";
import express from "express";

const router = express.Router();

router.post("/getAccountDetails",getAccountDetails);
router.post("/getAccountBalance",getAccountBalance);
router.post("/getAccountNumber",getAccountNumber);

export default router;