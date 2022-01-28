const Blog = require("../models/blog.js");

module.exports = {
    landing: function(req, res){
        let blogs = Blog.find({}, {article: 0});

        Promise.all([blogs])
            .then((response)=>{
                return res.render("landing/landing.eta", {
                    blogs: response[0]
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
    }
}