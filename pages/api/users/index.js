// USERS API 

import { sql_query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const querySQL = "SELECT * FROM users";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.content],
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const querySQL = "INSERT INTO users (username, password) VALUES (?,?)";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.username, req.body.password],
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
