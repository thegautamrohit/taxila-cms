import query from "../../lib/connectDb";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        let sql = "";
        const id = req.query.id;
        if (id) {
          sql = `
          SELECT * FROM media_category WHERE id = ${id}`;
        } else {
          sql = `
          SELECT * FROM media_category`;
        }

        const valueParams = [];

        const result = await query({ query: sql, value: valueParams });
        if (result) {
          res.status(200).json({ result: result });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const { title } = req.body;

        const sql = `
        INSERT into media_category (name) values (?)`;
        const valueParams = [title];

        const result = await query({ query: sql, value: valueParams });
        if (result) {
          res.status(200).json({ result: result });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        const id = req.query.id;
        const valueParams = [];
        const sql = `DELETE FROM media_category WHERE id = ${id}`;
        const result = await query({ query: sql, value: valueParams });
        if (result?.affectedRows > 0) {
          res.status(200).json({ result: "Category successfully deleted" });
        } else {
          res.status(400).json({ result: "Category not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "PATCH":
      try {
        const { title } = req.body;
        const id = req.query.id;
        let Item_Id = `SELECT * FROM media_category WHERE id = ${id}`;

        const findId = await query({ query: Item_Id });

        if (findId.length > 0) {
          const valueParams = [title];
          const sql = `UPDATE media_category SET name=?  WHERE id = ${id}`;
          const result = await query({ query: sql, value: valueParams });

          if (result?.affectedRows > 0) {
            res.status(200).json({
              message: "Category Updated Successfully",
              count: 20,
              next: "",
              result: result,
            });
          } else {
            res.status(400).json({ result: "Category not found" });
          }
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
  }
}
