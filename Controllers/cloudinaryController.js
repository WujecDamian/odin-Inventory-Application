const upload = require("../utils/imageUploadMiddleware");
const cloudinary = require("../utils/cloudinaryConfig");
const db = require("../Models/queries");
const { body, validationResult } = require("express-validator");

const handleForm = async (req, res) => {
  let uploadedImage = null;
  let folderDest = "";

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ result: result.array() });
  }

  try {
    const type = req.query.type;
    if (type === "part") {
      const chosenSubcategory = await db.getSubcategoryById(
        req.body.subcategoryId,
      );
      const chosenSubcategoryLowerCase = chosenSubcategory.toLowerCase();

      folderDest = chosenSubcategoryLowerCase;
    }

    if (!["category", "subcategory", "part"].includes(type)) {
      throw new Error("Invalid type");
    }

    let imageUrl = null;
    let publicId = null;

    if (req.file) {
      const filebase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${filebase64}`;
      switch (type) {
        case "category":
          folderDest = "categories";
          break;
        case "subcategory":
          folderDest = "subcategories";
          break;
        case "part":
          break;
        default:
          break;
      }
      uploadedImage = await cloudinary.uploader.upload(file, {
        folder: "/inventory_app(carparts)/" + folderDest,
      });

      imageUrl = uploadedImage.secure_url;
      publicId = uploadedImage.public_id;
    }

    // 🧠 DB logic based on type
    if (type === "category") {
      const { name } = req.body;
      if (!name) {
        return res.status(400).send("Name required");
      }
      if (!imageUrl || !publicId) {
        return res.status(400).send("Image required");
      }

      await db.createCategory(name, imageUrl, publicId);
    } else if (type === "subcategory") {
      const { categoryId, name } = req.body;

      await db.createSubcategory(name, categoryId, imageUrl, publicId);
    } else if (type === "part") {
      const { brand, model, price, quantity, subcategoryId } = req.body;

      if (!price) {
        return res.status(400).send("Price required");
      }

      await db.createPart(
        brand,
        model,
        price,
        quantity,
        imageUrl,
        publicId,
        subcategoryId,
      );
    }
    res.redirect(req.get("Referrer"));
  } catch (err) {
    console.error(err);

    if (uploadedImage) {
      await cloudinary.uploader.destroy(uploadedImage.public_id);
    }

    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  handleForm,
};
