import query from "../../lib/connectDb";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const valueParams = [];
        const sql = `SELECT * FROM material`;
        const result = await query({ query: sql, value: valueParams });
        if (result) {
          res.status(200).json({ result: result });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      // code block
      break;
    case "DELETE":
      try {
        const id = req.query.id;
        const valueParams = [];
        const sql = `DELETE FROM material WHERE id = ${id}`;
        const result = await query({ query: sql, value: valueParams });
        if (result?.affectedRows > 0) {
          res.status(200).json({ result: "Product successfully deleted" });
        } else {
          res.status(400).json({ result: "Product not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "PATCH":
      break;
    default:
  }
}
