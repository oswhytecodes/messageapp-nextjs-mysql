import { sql_query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const querySQL =
        "SELECT messages.id, users.userID, users.username, messages.userMessage, messages.date FROM users INNER JOIN messages ON users.userID=messages.userID ORDER BY messages.id ASC";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.content],
      });
      // console.log(results);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const querySQL =
        "INSERT INTO messages (userID, userMessage, favorite) VALUES (?,?,?)";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.userId, req.body.userMessage, req.body.favorite],
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const querySQL = "DELETE FROM messages WHERE id = ?";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.id],
      });
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
