import { sql_query } from "../../../lib/db";

export default async function handler(req, res) {
  const { userId } = req.query;
  try {
    const querySQL =
      "SELECT messages.id, users.userID, users.username, messages.userMessage, messages.date, messages.favorite FROM users INNER JOIN messages ON users.userID=messages.userID ORDER BY messages.date DESC";
    const results = await sql_query({
      query: querySQL,
      values: [req.body.content],
    });

    const updatedResults = results.filter(
      (user) => user.userID === parseInt(userId)
    );
    res.status(200).json(updatedResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
