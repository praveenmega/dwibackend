const fs = require("fs");
const path = require("path");
const { Listings } = require("../models/listing");

// const listings = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/listings.json`));

// exports.checkId = (req,res,next,val) => {
//     const id = req.params.id * 1;
//     const data = listings.find(el => el.id === id);

//     if(!data) {
//         return res.status(404).json({
//             status: 'fail',
//             message: "Invalid id"
//         });
//     }

//     next();
// };

exports.getAllListings = async (req, res) => {
  try {
    const result = await Listings.find();
    return res.send(result);
  } catch (err) {
    return res.status(404).send("not found");
  }
};

// movieRoute.get('/:id',async(req,res) => {
//     try{
//         const result = await Movie.findById(req.params.id);
//         return res.send(result);
//     }
//     catch(err) {
//         return res.status(404).send('not found');
//     }
// });

exports.postListing = async (req, res) => {
  try {
    const assetsBaseUrl = "https://dwi-backend-fhvx.onrender.com/assets/";
    let newLocation = null;
    if (req.body.location) newLocation = req.body.location;

    const newListings = new Listings({
      ...req.body,
      location: newLocation,
      userId: 1,
    });
    newListings.images = req.files.map((file) => {
      var [name, ext] = file.originalname.split(".");
      var filename = `${name}_full.${ext}`;
      var thumbname = `${name}_thumb.${ext}`;

      return {
        url: `${assetsBaseUrl}${filename}`,
        thumbnailUrl: `${assetsBaseUrl}${thumbname}`,
      };
    });

    const result = await newListings.save();
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
