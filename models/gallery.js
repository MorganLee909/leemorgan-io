const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: [String],
    images: [String],
    location: {
        type: {type: String},
        coordinates: [],
        required: false
    }
});

GallerySchema.index({location: "2dsphere"});

module.exports = mongoose.model("Gallery", GallerySchema);