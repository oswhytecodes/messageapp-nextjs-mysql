import { sql_query } from "../../../lib/db";

export default async function handler(req, res) {
  // add a new favorite
  if (req.method === "POST") {
    try {
      const querySQL =
        "INSERT INTO favorites SELECT id, userID, userMessage, date FROM messages WHERE id = ?";
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
        "DELETE FROM favorites WHERE messageID = ? AND userID = ?";
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
      const querySQL = "SELECT * FROM favorites";
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
