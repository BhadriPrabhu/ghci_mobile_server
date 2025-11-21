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

export const searchUser = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const sql = `
      SELECT phone_no, email, serial_no, name, upi_id, age, gender, language, address, pin_code
      FROM users
      WHERE 
        upi_id ILIKE $1
        OR phone_no::text ILIKE $1
    `;

    const result = await pool.query(sql, [`%${query}%`]);

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