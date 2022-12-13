import query from "../../lib/connectDb";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const id = req.query.id;
        let sql = "";
        if (id) {
          sql = `
        SELECT * FROM taxilaVideo WHERE taxilaVideo.id = ${id}`;
        } else {
          sql = `
        SELECT * FROM taxilaVideo`;
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
        const { category, link, title, company } = req.body;

        const sql = `
        INSERT into taxilaVideo(category,link,title,company) values (?,?,?,?)`;

        const valueParams = [category, link, title, company];

        const result = await query({ query: sql, value: valueParams });
        if (result) {
          res.status(200).json({ result: "Video Added Successfully" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        const id = req.query.id;
        const valueParams = [];
        const sql = `DELETE FROM taxilaVideo WHERE id = ${id}`;
        const result = await query({ query: sql, value: valueParams });
        if (result?.affectedRows > 0) {
          res.status(200).json({ result: "Video successfully deleted" });
        } else {
          res.status(400).json({ result: "Video not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "PATCH":
      try {
        const { category, link , title , company } = req.body;
        const id = req.query.id;
        let videoId = `SELECT * FROM taxilaVideo WHERE id = ${id}`;

        const findId = await query({ query: videoId });

        if (findId.length > 0) {
          const valueParams = [category, link , title , company];
          const sql = `UPDATE taxilaVideo SET category=? ,link=? ,title=? ,company=? WHERE id = ${id}`;
          const result = await query({ query: sql, value: valueParams });

          if (result?.affectedRows > 0) {
            res.status(200).json({
              message: "Video Updated Successfully",
              count: 20,
              next: "",
              result: result,
            });
          } else {
            res.status(400).json({ result: "Video not found" });
          }
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
  }
}
