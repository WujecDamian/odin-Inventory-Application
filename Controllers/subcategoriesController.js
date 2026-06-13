const db = require("../Models/queries");

const getSubcategories = async (req, res) => {
  if (!req.query.category) {
    const subcategories = await db.getAllSubcategories();
    const categories = await db.getCategories();
    res.render("subcategories", {
      subcategories,
      categories,
      categoryObj: undefined,
    });
  } else {
    const category = req.query.category;
    const categoryObj = await db.getCategory(category);
    console.log(typeof category);
    console.log(
      `category: ${categoryObj} | name: ${categoryObj.name} | id: ${categoryObj.id}`,
    );
    const subcategories = await db.getSubcategories(category);
    res.render("subcategories", {
      subcategories,
      categoryObj,
      categories: undefined,
    });
  }
};

module.exports = {
  getSubcategories,
};
