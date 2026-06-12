const db = require("../Models/queries");

const getSubcategories = async (req, res) => {
  const category = req.query.category;
  const subcategories = await db.getSubcategories(category);
  res.render("subcategories", { subcategories });
};

module.exports = {
  getSubcategories,
};
