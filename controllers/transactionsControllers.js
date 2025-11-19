import { pool } from "../db/db.js";

export const getTransactionsDetails = async (req, res) => {
    try {
        const { account_no } = req.body;

        if (!account_no) {
            return res.status(400).json({ error: "Account number is required" });
        }

        const result = await pool.query(
            `SELECT * FROM transactions 
             WHERE account_no = $1 
                OR from_acc = $1 
                OR to_acc = $1`,
            [account_no]
        );

        res.json(result.rows);
    } catch (err) {
        console.log("Error", err);
        res.status(500).json({ error: "Server error" });
    }
};
