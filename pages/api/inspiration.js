import query from "../../lib/connectDb";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        let sql = "";
        const category = req.query?.category;

        if (category) {
          sql = `
          SELECT * FROM inspirationData LEFT JOIN inspirationDetails ON inspirationData.detail_id = inspirationDetails.id WHERE category_id = ${category}`;
        } else {
          sql = `
          SELECT inspirationData.id , inspirationData.primary_image , inspirationData.category_id ,inspirationData.title ,inspirationData.description ,inspirationDetails.image  FROM inspirationData LEFT JOIN inspirationDetails ON inspirationData.detail_id = inspirationDetails.id`;
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
        const { primary_image, category_id, title, description, image } =
          req.body;

        const sqlData = `INSERT into inspirationDetails (title,image) values (?,?)`;
        const valueParamsData = [title, image];

        const resultData = await query({
          query: sqlData,
          value: valueParamsData,
        });

        const sql = `
        INSERT into inspirationData (primary_image,category_id,title,description,detail_id) values (?,?,?,?,?)`;
        const valueParams = [
          primary_image,
          category_id,
          title,
          description,
          resultData.insertId,
        ];

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
        const sql = `DELETE FROM inspirationData WHERE id = ${id}`;
        const result = await query({ query: sql, value: valueParams });
        if (result?.affectedRows > 0) {
          res.status(200).json({ result: "Data successfully deleted" });
        } else {
          res.status(400).json({ result: "Data not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "PATCH":
      try {
        const {
          primary_image,
          category_id,
          title,
          description,
          image,
          detail_id,
        } = req.body;
        const id = req.query.id;
        let Item_Id = `SELECT * FROM inspirationData WHERE id = ${id}`;

        const findId = await query({ query: Item_Id });

        if (findId.length > 0) {
          const valueParams = [primary_image, category_id, title, description];
          const valueParamsDetails = [title, image];
          const sql = `UPDATE inspirationData SET primary_image=? ,category_id=? ,title=? ,description=?  WHERE id = ${id}`;
          const sqlDetail = `UPDATE inspirationDetails SET title=? ,image=? WHERE id = ${detail_id}`;
          const result = await query({ query: sql, value: valueParams });
          const resultDetail = await query({
            query: sqlDetail,
            value: valueParamsDetails,
          });

          if (result?.affectedRows > 0 && resultDetail?.affectedRows) {
            res.status(200).json({
              message: "Inspiration data Updated Successfully",
              count: 20,
              next: "",
              result: result,
            });
          } else {
            res.status(400).json({ result: "Inspiration data not found" });
          }
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
  }
}
