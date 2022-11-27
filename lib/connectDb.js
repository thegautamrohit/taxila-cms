import mysql from "mysql2/promise";

export default async function query({ query, value = [] }) {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    const [result] = await db.execute(query, value);
    db.end();
    return result;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}