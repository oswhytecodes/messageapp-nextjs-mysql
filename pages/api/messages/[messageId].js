 import { sql_query } from "../../../lib/db";

export default async function handler(req, res) {
  const { messageId } = req.query;
  if (req.method === "PUT") {
    try {
      const querySQL =
        "UPDATE messages SET userMessage = ?, date = CURRENT_TIMESTAMP WHERE id = ?";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.userMessage, req.body.id],
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const querySQL = "SELECT * FROM messages";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.id],
      });
      const message = results.filter(
        (message) => message.id === parseInt(messageId)
      );
      res.status(200).json(message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
