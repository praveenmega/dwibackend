const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const outputFolder = "public/assets";

module.exports = async (req, res, next) => {
  const images = [];

  const resizePromises = req.files.map(async (file) => {
    var [name, ext] = file.originalname.split('.');
    var filename = `${name}_full.${ext}`;
    var thumbname = `${name}_thumb.${ext}`;
    await sharp(file.path)
      .resize(2000)
      .jpeg({ quality: 50 })
      .toFile(path.resolve(outputFolder, filename));

    await sharp(file.path)
      .resize(100)
      .jpeg({ quality: 30 })
      .toFile(path.resolve(outputFolder, thumbname));

    fs.unlinkSync(file.path);

    images.push(file.filename);
  });

  await Promise.all([...resizePromises]);

  req.images = images;

  next();
};