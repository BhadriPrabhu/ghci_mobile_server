import { pool } from "../db/db.js";

export const getUsers = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email || !phone) {
      return res.status(400).json({ error: "Email and phone are required" });
    }

    const result = await pool.query("SELECT phone_no, email, serial_no, name, upi_id, age, gender, language, address, pin_code FROM users WHERE email = $1 AND phone_no = $2",[email, phone]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPassword = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email || !phone) {
      return res.status(400).json({ error: "Email and phone are required" });
    }

    const result = await pool.query("SELECT password FROM users WHERE email = $1 AND phone_no = $2",[email, phone]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};