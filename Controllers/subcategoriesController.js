const db = require("../Models/queries");

const getSubcategories = async (req, res) => {
  if (!req.query.category) {
    const subcategories = await db.getAllSubcategories();
    res.render("subcategories", { subcategories });
  } else {
    const category = req.query.category;
    const subcategories = await db.getSubcategories(category);
    res.render("subcategories", { subcategories });
  }
};

module.exports = {
  getSubcategories,
};
