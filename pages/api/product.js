import query from "../../lib/connectDb";
export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const valueParams = [];
        const sql = `
        SELECT id , name FROM material LEFT JOIN technicalspecification ON material.id = technicalspecification.material_id LEFT JOIN feature ON material.id = feature.material_id LEFT JOIN application ON material.id = application.material_id`;
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
        const {
          parent_class,
          category,
          material,
          slug,
          description,
          main_image,
          images,
          petrographic_denominations,
          hardness,
          water_absorption,
          apparnt_density,
          open_poorosity,
          flexural_strength,
          abrasion_strength,
          compressive_strength,
          counter_tops,
          floorings,
          walls,
          shower,
          fireplace,
          outdoor,
          chips,
          heat,
          stain,
          scratch,
          water,
          frost,
          country_of_origin,
          finish,
          level,
          care_instructions,
          color,
          meta_description,
          shop_link,
          rank,
        } = req.body;

        const materialParams = [
          slug,
          rank,
          parent_class,
          main_image,
          images,
          country_of_origin,
          level,
          care_instructions,
          meta_description,
          color,
          finish,
        ];

        const applicationParams = [
          counter_tops,
          floorings,
          walls,
          shower,
          fireplace,
          outdoor,
        ];

        const sqlApplication = `
        INSERT into material ("countertops", "floorings", "walls", "shower","fireplace", "outdoor", "material_id")`;

        const sqlMaterial = `
        INSERT into material ("slug", "ranking", "name", "images","origin_country", "level", "care_instruction" , "meta_description", "color", "finish")`;

        const featureParams = [chips, heat, stain, scratch, water, frost];

        const sqlFeature = `
        INSERT into material ("chip", "heat", "stain", "scratch","water", "frost", "material_id")`;

        const technicalSpecificationParams = [
          petrographic_denominations,
          hardness,
          water_absorption,
          apparnt_density,
          open_poorosity,
          flexural_strength,
          abrasion_strength,
          compressive_strength,
        ];

        const sqlTechnicalSpecification = `
        INSERT into material ("petrographic_denomination", "hardness", "water_absorption", "apparent_density","open_porosity", "abrasion_strength", "compressive_strength" , "attachment", "material_id")`;

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
