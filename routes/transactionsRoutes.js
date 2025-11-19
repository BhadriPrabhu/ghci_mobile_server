import { getTransactionsDetails, transferMoney } from "../controllers/transactionsControllers.js";
import express from "express";

const router = express.Router();

router.post("/getTransactionsDetails", getTransactionsDetails);
router.post("/transferMoney", transferMoney);

export default router;