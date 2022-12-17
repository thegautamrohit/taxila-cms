import query from "../../lib/connectDb";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        let sql = "";
        const type = req.query?.type;
        const id = req.query?.id;

        if (type === "kitchenCategory" && id) {
          sql = `
          SELECT * FROM kitchencategory`;
        }
        if (type === "kitchenCategory" && id) {
          sql = `
          SELECT * FROM kitchenitem WHERE category_id = ${id}`;
        }
        if (!type && id) {
          sql = `
          SELECT * FROM kitchenitem WHERE id = ${id}`;
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
      const kitchencategory = req.query?.kitchencategory;

      try {
        const {
          ranking,
          name,
          description_en,
          description_it,
          base_unit,
          wall_unit,
          tall_unit,
          design_solution,
          other,
          images,
          category_id,
        } = req.body;

        const sql = `
        INSERT into kitchenitem(ranking,name,description_en,description_it,base_unit,wall_unit,tall_unit,design_solution,other,images,category_id) values (?,?,?,?,?,?,?,?,?,?,?)`;
        const valueParams = [
          ranking,
          name,
          description_en,
          description_it,
          base_unit,
          wall_unit,
          tall_unit,
          design_solution,
          other,
          images,
          category_id,
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
        const sql = `DELETE FROM kitchenitem WHERE id = ${id}`;
        const result = await query({ query: sql, value: valueParams });
        if (result?.affectedRows > 0) {
          res.status(200).json({ result: "Kitchen Item successfully deleted" });
        } else {
          res.status(400).json({ result: "Kitchen Item not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "PATCH":
      try {
        const {
          ranking,
          name,
          description_en,
          description_it,
          base_unit,
          wall_unit,
          tall_unit,
          design_solution,
          other,
          images,
          category_id,
        } = req.body;
        const id = req.query.id;
        let Item_Id = `SELECT * FROM kitchenitem WHERE id = ${id}`;

        const findId = await query({ query: Item_Id });

        if (findId.length > 0) {
          const valueParams = [
            ranking,
            name,
            description_en,
            description_it,
            base_unit,
            wall_unit,
            tall_unit,
            design_solution,
            other,
            images,
            category_id,
          ];
          const sql = `UPDATE kitchenitem SET ranking=? ,name=? ,description_en=? ,description_it=? ,base_unit=? ,wall_unit=? ,tall_unit=? ,design_solution=? ,other=? ,images=? ,category_id=? WHERE id = ${id}`;
          const result = await query({ query: sql, value: valueParams });

          if (result?.affectedRows > 0) {
            res.status(200).json({
              message: "Kitchen Item Updated Successfully",
              count: 20,
              next: "",
              result: result,
            });
          } else {
            res.status(400).json({ result: "Kitchen Item not found" });
          }
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
  }
}
