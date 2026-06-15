const express = require("express");
const router = express.Router();

//controllers
const homeController = require("../Controllers/homeController");

// define the home page route
router.get("/", homeController.getCategories);

router.post("/edit/:id", homeController.editCategory);

router.get("/delete/:id", homeController.deleteCategory);

module.exports = router;
