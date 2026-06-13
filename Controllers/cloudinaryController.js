const upload = require("../utils/imageUploadMiddleware");
const cloudinary = require("../utils/cloudinaryConfig");
const db = require("../Models/queries");

const handleForm = async (req, res) => {
  let uploadedImage = null;

  try {
    const type = req.query.type;
    if (type === "part") {
      const chosenSubcategory = req.body.subcategory;
    }

    if (!["category", "subcategory", "part"].includes(type)) {
      throw new Error("Invalid type");
    }

    let imageUrl = null;
    let publicId = null;

    // 📸 Upload only if file exists
    if (req.file) {
      const filebase64 = req.file.buffer.toString("base64");
      const file = `data:${req.file.mimetype};base64,${filebase64}`;
      let folderDest = "";
      switch (type) {
        case "category":
          folderDest = "categories";
          break;
        case "subcategory":
          folderDest = "subcategories";
          break;
        case "part":
          folderDest = chosenSubcategory;
          break;
        default:
          break;
      }
      uploadedImage = await cloudinary.uploader.upload(file, {
        folder: "products",
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
      const { price, subcategory_id } = req.body;

      if (!price) {
        return res.status(400).send("Price required");
      }

      await db.createPart();
    }

    res.redirect("/");
  } catch (err) {
    console.error(err);

    // 🧹 cleanup if DB failed AFTER upload
    if (uploadedImage) {
      await cloudinary.uploader.destroy(uploadedImage.public_id);
    }

    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  handleForm,
};
