const db = require("../Models/queries");

const getParts = async (req, res) => {
  if (!req.query.subcategory) {
    const parts = await db.getAllParts();
    const subcategories = await db.getAllSubcategories();

    res.render("parts", { parts, subcategoryObj: undefined, subcategories });
  } else {
    const subcategory = req.query.subcategory;
    const parts = await db.getParts(subcategory);
    const allSubcategories = await db.getAllSubcategories();
    const subcategoryObj = await db.getSubcategory(req.query.subcategory);

    res.render("parts", {
      parts,
      subcategoryObj,
      allSubcategories,
      subcategories: undefined,
    });
  }
};

const editPart = async (req, res) => {
  const partId = req.params.id;
  const brand = req.body.brand;
  const model = req.body.model;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const subcategoryId = req.body.subcategoryId;
  console.log(partId, brand, model, price, quantity, subcategoryId);
  await db.updatePart(brand, model, price, quantity, subcategoryId, partId);
  res.redirect(req.get("Referrer"));
};

module.exports = {
  getParts,
  editPart,
};
