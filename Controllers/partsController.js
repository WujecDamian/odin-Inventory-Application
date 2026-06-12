const db = require("../Models/queries");

const getParts = async (req, res) => {
  const subcategory = req.query.subcategory;
  const parts = await db.getParts(subcategory);
  res.render("parts", { parts });
};

module.exports = {
  getParts,
};
