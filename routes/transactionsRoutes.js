import { getTransactionsDetails } from "../controllers/transactionsControllers.js";
import express from "express";

const router = express.Router();

router.post("/getTransactionsDetails", getTransactionsDetails);

export default router;