const db = require("../Models/queries");

const getParts = async (req, res) => {
  if (!req.query.subcategory) {
    const parts = await db.getAllParts();
    const subcategories = await db.getAllSubcategories();

    res.render("parts", { parts, subcategoryObj: undefined, subcategories });
  } else {
    const subcategory = req.query.subcategory;
    const parts = await db.getParts(subcategory);
    const subcategoryObj = await db.getSubcategory(req.query.subcategory);

    res.render("parts", { parts, subcategoryObj, subcategories: undefined });
  }
};

module.exports = {
  getParts,
};
