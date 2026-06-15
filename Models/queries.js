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
async function getSubcategory(name) {
  const { rows } = await pool.query(
    "SELECT * FROM subcategories WHERE name = $1",
    [name],
  );
  return rows[0];
}
async function getSubcategoryById(id) {
  const { rows } = await pool.query(
    "SELECT name FROM subcategories WHERE id = $1",
    [id],
  );
  return rows[0].name;
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

async function createCategory(name, imageUrl, publicId) {
  pool.query(
    "INSERT INTO categories (name,image_url,image_public_id) VALUES ($1,$2,$3)",
    [name, imageUrl, publicId],
  );
}
async function createSubcategory(name, categoryId, imageUrl, publicId) {
  pool.query(
    "INSERT INTO subcategories (name,image_url,image_public_id,category_id) VALUES ($1,$2,$3,$4)",
    [name, imageUrl, publicId, categoryId],
  );
}
async function createPart(
  brand,
  model,
  price,
  quantity,
  imageUrl,
  publicId,
  subcategoryId,
) {
  pool.query(
    "INSERT INTO parts (brand,model,price,quantity,image_url,image_public_id,subcategory_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [brand, model, price, quantity, imageUrl, publicId, subcategoryId],
  );
}

// UPDATES
async function updateCategory(categoryId, name) {
  pool.query("UPDATE categories SET name = $1 WHERE id = $2", [
    name,
    categoryId,
  ]);
}
async function updateSubcategory(subcategoryId, name, categoryId) {
  pool.query(
    "UPDATE subcategories SET (name,category_id) = ($2,$3) WHERE id = ($1)",
    [subcategoryId, name, categoryId],
  );
}
async function updatePart(
  brand,
  model,
  price,
  quantity,
  subcategoryId,
  partId,
) {
  pool.query(
    "UPDATE parts SET (brand,model,price,quantity,subcategory_id) = ($1,$2,$3,$4,$5) WHERE id = ($6)",
    [brand, model, price, quantity, subcategoryId, partId],
  );
}

module.exports = {
  getCategories,
  getCategory,
  getSubcategories,
  getSubcategory,
  getSubcategoryById,
  getAllSubcategories,
  getParts,
  getAllParts,
  createCategory,
  createSubcategory,
  createPart,
  updateCategory,
  updateSubcategory,
  updatePart,
};
