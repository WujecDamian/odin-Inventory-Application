const db = require("../Models/queries");

const getParts = async (req, res) => {
  console.log(req.query);
  if (!req.query.subcategory) {
    const parts = await db.getAllParts();
    res.render("parts", { parts });
  } else {
    const subcategory = req.query.subcategory;
    const parts = await db.getParts(subcategory);
    res.render("parts", { parts });
  }
};

module.exports = {
  getParts,
};
