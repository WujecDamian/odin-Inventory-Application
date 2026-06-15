const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUploadMiddleware");
const cloudinary = require("../utils/cloudinaryConfig");

const formController = require("../Controllers/cloudinaryController");
const validator = require("../validators/newValidator");

router.post(
  "/",
  upload.single("image"),
  validator.validateForm,
  formController.handleForm,
);

module.exports = router;
