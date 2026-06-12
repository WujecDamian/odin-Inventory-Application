const db = require("../Models/queries");

const getCategories = async (req, res) => {
  const categories = await db.getCategories();
  res.render("home", { categories: categories });
  console.log(categories);
};

module.exports = {
  getCategories,
};
