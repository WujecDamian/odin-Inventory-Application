const express = require("express");
const router = express.Router();

//controllers
const subcategoryController = require("../Controllers/subcategoriesController");

// define the home page route
router.get("/", subcategoryController.getSubcategories);

router.post("/edit/:id", subcategoryController.editSubcategory);

module.exports = router;
