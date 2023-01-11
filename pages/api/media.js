import query from "../../lib/connectDb";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        let sql = "";
        const name = req.query.name;
        const id = req.query.id;
        if (id) {
          sql = `
          SELECT * FROM media WHERE id = ${id}`;
          const valueParams = [];

          const result = await query({ query: sql, value: valueParams });
          if (result) {
            res.status(200).json({ result: result });
          }
        }

        if (name) {
          sql = `
        SELECT * FROM media WHERE category = "${name}"`;
          const valueParams = [];

          const result = await query({ query: sql, value: valueParams });
          if (result) {
            res.status(200).json({ result: result });
          }
        } else {
          sql = `
        SELECT category FROM media`;

          const valueParams = [];

          const result = await query({ query: sql, value: valueParams });
          if (result) {
            let newArray = [];
            let lookupObject = {};

            for (var i in result) {
              lookupObject[result[i]["category"]] = result[i];
            }

            for (i in lookupObject) {
              newArray.push(lookupObject[i]);
            }

            res.status(200).json({ result: newArray });
          }
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const { date, category, link, images, website, edition } = req.body;

        const sql = `
        INSERT into media(date,category,link,images,website,edition) values (?,?,?,?,?,?)`;

        const valueParams = [date, category, link, images, website, edition];

        const result = await query({ query: sql, value: valueParams });
        if (result) {
          res.status(200).json({ result: "Media Added Successfully" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "DELETE":
      try {
        const id = req.query.id;
        const valueParams = [];
        const sql = `DELETE FROM media WHERE id = ${id}`;
        const result = await query({ query: sql, value: valueParams });
        if (result?.affectedRows > 0) {
          res.status(200).json({ result: "Media successfully deleted" });
        } else {
          res.status(400).json({ result: "Media not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "PATCH":
      try {
        const { date, category, link, images, website, edition } = req.body;
        const id = req.query.id;
        let videoId = `SELECT * FROM media WHERE id = ${id}`;

        const findId = await query({ query: videoId });

        if (findId.length > 0) {
          const valueParams = [date, category, link, images, website, edition];
          const sql = `UPDATE media SET date=? ,category=? ,link=? ,images=? ,website=? ,edition=? WHERE id = ${id}`;
          const result = await query({ query: sql, value: valueParams });

          if (result?.affectedRows > 0) {
            res.status(200).json({
              message: "Media Updated Successfully",
              count: 20,
              next: "",
              result: result,
            });
          } else {
            res.status(400).json({ result: "Media not found" });
          }
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
  }
}
