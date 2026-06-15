const express = require("express");
const router = express.Router();

//controllers
const partsController = require("../Controllers/partsController");
const validator = require("../validators/newValidator");

// define the home page route
router.get("/", partsController.getParts);

router.post("/edit/:id", validator.validateEditForm, partsController.editPart);

router.get("/delete/:id", partsController.deletePart);

module.exports = router;
