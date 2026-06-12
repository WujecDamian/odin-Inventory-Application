const pool = require("../db/pool");

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getSubcategories(category) {
  const { rows } = await pool.query(
    "SELECT * FROM subcategories WHERE category_id = (SELECT id FROM categories WHERE name = ($1))",
    [category],
  );
  return rows;
}

async function getParts(subcategory) {
  const { rows } = await pool.query(
    "SELECT * FROM parts WHERE subcategory_id = (SELECT id FROM subcategories WHERE name = ($1))",
    [subcategory],
  );
  return rows;
}

module.exports = {
  getCategories,
  getSubcategories,
  getParts,
};
