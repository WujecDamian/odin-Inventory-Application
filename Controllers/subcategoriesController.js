const db = require("../Models/queries");

const getSubcategories = async (req, res) => {
  if (!req.query.category) {
    const subcategories = await db.getAllSubcategories();
    const categories = await db.getCategories();
    res.render("./subcategories", {
      subcategories,
      categories,
      categoryObj: undefined,
    });
  } else {
    const category = req.query.category;
    const categoryObj = await db.getCategory(category);
    const allCategories = await db.getCategories();
    const subcategories = await db.getSubcategories(category);
    res.render("./subcategories", {
      subcategories,
      categoryObj,
      allCategories,
      categories: undefined,
    });
  }
};

const editSubcategory = async (req, res) => {
  const subcategoryId = req.params.id;
  const name = req.body.name;
  const categoryId = req.body.categoryId;

  await db.updateSubcategory(subcategoryId, name, categoryId);
  setTimeout(() => {
    res.redirect(req.get("Referrer"));
  }, 500);
};

const deleteSubcategory = async (req, res) => {
  const subcategoryId = req.params.id;
  await db.deleteSubcategory(subcategoryId);
  setTimeout(() => {
    res.redirect(req.get("Referrer"));
  }, 500);
};

module.exports = {
  getSubcategories,
  editSubcategory,
  deleteSubcategory,
};
