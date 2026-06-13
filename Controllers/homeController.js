const db = require("../Models/queries");

const getCategories = async (req, res) => {
  const categories = await db.getCategories();
  res.render("home", { categories: categories });
};

module.exports = {
  getCategories,
};
