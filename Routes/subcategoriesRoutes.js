const express = require("express");
const router = express.Router();

//controllers
const subcategoryController = require("../Controllers/subcategoriesController");

// define the home page route
router.get("/", subcategoryController.getSubcategories);

router.post("/edit/:id", subcategoryController.editSubcategory);

router.get("/delete/:id", subcategoryController.deleteSubcategory);

module.exports = router;
