const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [
      {
        url:String,
        thumbnailUrl:String,
      },
    ],
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
  },
  location: {
    type: {
      latitude: Number,
      longitude: Number,
    },
  },
});

const listing = mongoose.model("listings", listingSchema);

module.exports.Listings = listing;
