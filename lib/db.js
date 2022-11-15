import mysql from "serverless-mysql";
// serverless-mysql is a wrapper for the mysql module that adds connection management, async/await support and monitoring of number of connections.

export const DB = mysql({
  config: {
    user: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    port: process.env.NEXT_PUBLIC_MYSQL_PORT,
  },
});

export async function sql_query({ query, values }) {
  try {
    const results = await DB.query(query, values);
    await DB.end();
    return results;
  } catch (error) {
    throw Error(error.message);
  }
}
