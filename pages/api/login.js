import query from "../../lib/connectDb";
import jwt from "jsonwebtoken";
export default async function handler(req, res) {
  try {
    const valueParams = [];
    const email = req?.body?.email;
    const password = req?.body?.password;
    if (req?.body?.email && req?.body?.password) {
      const sql = `SELECT email , password FROM Users WHERE email = "${email}" AND password = "${password}";`;
      const [result] = await query({ query: sql, value: valueParams });
      if (result) {
        const user = { name: email };
        const jwtToken = jwt.sign(
          { exp: Math.floor(Date.now() / 1000) + 60 * 60, user },
          process.env.ACCESS_TOKEN_SECRET
        );

        res.status(200).json({ token: jwtToken });
      }
      res.status(400).json({ error: "No user found with this Username" });
    }
    res.status(400).json({ error: "Please fill Username or Password" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
