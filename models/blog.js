const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: [String],
    thumbnail: String,
    article: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(),
        required: true
    }
});

module.exports = new mongoose.model("blog", BlogSchema);