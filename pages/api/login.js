import query from "../../lib/connectDb";

export default async function handler(req, res) {
  try {
    const sql = "SELECT * FROM material";
    const valueParams = [10];
    const [result] = await query({ query: sql, value: valueParams });
    res.status(200).json({ result: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}