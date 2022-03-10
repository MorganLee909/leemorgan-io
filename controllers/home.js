const Blog = require("../models/blog.js");
const Gallery = require("../models/gallery.js");
const Currency = require("../models/currency.js");

module.exports = {
    landing: function(req, res){
        let blogs = Blog.find({}, {article: 0});
        let currency = Currency.find();

        Promise.all([blogs, currency])
            .then((response)=>{
                return res.render("landing/landing.eta", {
                    blogs: response[0],
                    currency: response[1]
                });
            })
            .catch((err)=>{
                console.error(err);
            });
    },

    sudoku: function(req, res){
        return res.render("sudoku/sudoku.eta");
    },

    birthday: function(req, res){
        return res.render("birthday/birthday.eta");
    },

    getGalleries: function(req, res){
        Gallery.find({})
            .then((galleries)=>{
                let newGalleries = [];
                for(let i = 0; i < galleries.length; i++){
                    newGalleries.push({
                        _id: galleries[i]._id,
                        title: galleries[i].title,
                        tags: galleries[i].tags,
                        image: galleries[i].images[0],
                        location: galleries[i].location
                    });
                }

                return res.json({galleries: newGalleries, key: process.env.MAPBOX_KEY});
            })
            .catch((err)=>{
                console.error(err);
                return res.json("Failed to find galleries");
            })
    }
}