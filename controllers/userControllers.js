import { pool } from "../db/db.js";

export const getUsers = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email || !phone) {
      return res.status(400).json({ error: "Email and phone are required" });
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1 AND phone_no = $2",[email, phone]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPassword = async (req, res) => {
  try {
    const { account_no } = req.body;

    if (!account_no) {
      return res.status(400).json({ error: "Account No. is required" });
    }

    const result = await pool.query("SELECT password FROM users WHERE account_no = $1",[account_no]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};