const express = require("express");
const router = express.Router();

//controllers
const partsController = require("../Controllers/partsController");

// define the home page route
router.get("/", partsController.getParts);

router.post("/edit/:id", partsController.editPart);

module.exports = router;
