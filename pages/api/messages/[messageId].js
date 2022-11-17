import { sql_query } from "../../../lib/db";

export default async function handler(req, res) {
  const { messageId } = req.query;

  if (req.method === "DELETE") {
    try {
      const querySQL = "DELETE FROM messages WHERE id = ?";

      const results = await sql_query({
        query: querySQL,
        values: [req.body.id],
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "UPDATE") {
  }
}
