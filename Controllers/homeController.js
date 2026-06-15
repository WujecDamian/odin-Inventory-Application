const db = require("../Models/queries");

const getCategories = async (req, res) => {
  const categories = await db.getCategories();
  res.render("home.ejs", { categories: categories });
};

const editCategory = async (req, res) => {
  const categoryId = req.params.id;
  const name = req.body.name;
  console.log(categoryId);
  console.log(req.body.name);
  await db.updateCategory(categoryId, name);
  setTimeout(() => {
    res.redirect(req.get("Referrer"));
  }, 500);
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;
  await db.deleteCategory(categoryId);
  setTimeout(() => {
    res.redirect(req.get("Referrer"));
  }, 500);
};

module.exports = {
  getCategories,
  editCategory,
  deleteCategory,
};
