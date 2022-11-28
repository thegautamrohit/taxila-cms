import query from "../../lib/connectDb";
import jwt from "jsonwebtoken";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
export default async function handler(req, res) {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const user = { name: username };
    const jwtToken = jwt.sign(
      { exp: Math.floor(Date.now() / 1000) + 60 * 60, user },
      process.env.ACCESS_TOKEN_SECRET
    );

    const sql = `INSERT INTO Users (id, createdAt, email) VALUES("123254","username")`;
    const valueParams = [];

    const result = await query({ query: sql, value: valueParams });

    console.log(result);

    res.status(200).json({ result: jwtToken });
  } catch (error) {
    // res.status(500).json({ error: error.message });
  }
}
