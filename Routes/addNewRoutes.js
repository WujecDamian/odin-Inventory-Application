const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUploadMiddleware");
const cloudinary = require("../utils/cloudinaryConfig");

const formController = require("../Controllers/cloudinaryController");

router.post("/", upload.single("image"), formController.handleForm);

module.exports = router;
