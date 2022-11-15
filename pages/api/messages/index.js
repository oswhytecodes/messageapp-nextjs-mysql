// MESSAGES API

import { sql_query } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const querySQL =
        "SELECT messages.id, users.userID, users.username, messages.userMessage, messages.date FROM users INNER JOIN messages ON users.userID=messages.userID";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.content],
      });
      // console.log(results);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const querySQL =
        "INSERT INTO messages (username, userMessage) VALUES (?,?)";
      const results = await sql_query({
        query: querySQL,
        values: [req.body.username, req.body.userMessage],
      });
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

/*
SELECT users.userID, users.username, messages.userMessage
FROM users
INNER JOIN messages ON users.userID=messages.userID
*/

// const querySQL = "SELECT * FROM messages WHERE userID = 6";
