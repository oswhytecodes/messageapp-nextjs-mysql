import { sql_query } from "../../../lib/db";

export default async function handler(req, res) {
  // add a new favorite
  if (req.method === "POST") {
    try {
      const querySQL =
        "UPDATE messages SET favorite = 1 - favorite WHERE id = ?";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.messageId],
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    // remove a favorite from the table
  } else if (req.method === "DELETE") {
    try {
      const querySQL =
        "UPDATE messages SET favorite = 1 - favorite WHERE id = ? AND userID = ?";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.messageId, req.body.userId],
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const querySQL = "SELECT * FROM messages WHERE favorite = 1";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.content],
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
