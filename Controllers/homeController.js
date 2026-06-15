const db = require("../Models/queries");

const getCategories = async (req, res) => {
  const categories = await db.getCategories();
  res.render("home", { categories: categories });
};

const editCategory = async (req, res) => {
  const categoryId = req.params.id;
  const name = req.body.name;
  console.log(categoryId);
  console.log(req.body.name);
  await db.updateCategory(categoryId, name);
  res.redirect(req.get("Referrer"));
};

module.exports = {
  getCategories,
  editCategory,
};
