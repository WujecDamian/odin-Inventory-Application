const pool = require("../db/pool");

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getCategory(name) {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE name = $1",
    [name],
  );
  return rows[0];
}

async function getSubcategories(category) {
  const { rows } = await pool.query(
    "SELECT * FROM subcategories WHERE category_id = (SELECT id FROM categories WHERE name = ($1))",
    [category],
  );
  return rows;
}
async function getAllSubcategories() {
  const { rows } = await pool.query("SELECT * FROM subcategories");
  return rows;
}
async function getParts(subcategory) {
  const { rows } = await pool.query(
    "SELECT * FROM parts WHERE subcategory_id = (SELECT id FROM subcategories WHERE name = ($1))",
    [subcategory],
  );
  return rows;
}
async function getAllParts() {
  const { rows } = await pool.query("SELECT * FROM parts");
  return rows;
}

//INSERTS

async function createCategory(name, image) {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}
async function createSubcategory(name, image) {
  const { rows } = await pool.query("SELECT * FROM subcategories");
  return rows;
}
async function createPart(name, image) {
  const { rows } = await pool.query("SELECT * FROM parts");
  return rows;
}

module.exports = {
  getCategories,
  getCategory,
  getSubcategories,
  getAllSubcategories,
  getParts,
  getAllParts,
  createCategory,
  createSubcategory,
  createPart,
};
