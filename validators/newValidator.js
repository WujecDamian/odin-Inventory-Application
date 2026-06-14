const { body } = require("express-validator");

const validators = {
  category: [
    body("name")
      .notEmpty()
      .withMessage("You must provide a category name")
      .isString()
      .withMessage("Category name must be a text")
      .isLength({ min: 1, max: 20 })
      .withMessage("Category name bust be between 1-20 characters"),
  ],
  subcategory: [
    body("name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("You must provide a category name")
      .isString()
      .withMessage("Category name must be a text")
      .isLength({ min: 1, max: 20 })
      .withMessage("Category name bust be between 1-20 characters"),
    ,
    body("categoryId")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("You must provide a parent category")
      .isNumeric()
      .withMessage("Parent category must be a type of number"),
  ],
  part: [
    body("brand")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("You must provide a Brand name")
      .isString()
      .withMessage("Brand name must be a text")
      .isLength({ min: 1, max: 20 })
      .withMessage("Brand name bust be between 1-20 characters"),
    body("model")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("You must provide a Model name")
      .isString()
      .withMessage("Model name must be a text")
      .isLength({ min: 1, max: 40 })
      .withMessage("Model name bust be between 1-40 characters"),
    body("price")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("You must provide a part price")
      .isNumeric({ min: 0, max: 1000000 })
      .withMessage("Price must be an amount lower than $1mil"),
    body("quantity")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("You must provide a part quantity")
      .isNumeric({ min: 0, max: 100000 })
      .withMessage("Quantity must be lower than 100.000"),
    body("subcategoryId")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("You must provide a parent subcategory")
      .isNumeric()
      .withMessage("Parent subcategory must be a type of number"),
  ],
};

const validateForm = (req, res) => {
  const type = req.query.type;
  const rules = validators[type] || [];

  Promise.all(
    rules
      .map((rule) => {
        rule.run(req);
      })
      .then(() => next()),
  );
};

module.exports = validateForm;
