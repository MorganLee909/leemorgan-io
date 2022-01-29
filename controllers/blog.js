const Blog = require("../models/blog.js");

const helper = require("../helper.js");

module.exports = {
    add: function(req, res){
        return res.render("blog/new.eta");
    },

    /*
    POST: creates a new blog
    req.body = {
        password: String
        title: String
        tags: String
        article: String
    }
    req.files = {
        thumbnail: File
    }
    */
    create: function(req, res){
        if(req.body.password !== process.env.SITE_PASSWORD) return res.redirect("/");

        let blog = new Blog({
            title: req.body.title,
            tags: req.body.tags.split(" "),
            thumbnail: helper.createFiles([req.files.thumbnail], "thumbnails"),
            article: req.body.article
        });

        blog.save()
            .then((blog)=>{
                return res.redirect(`/blog/${blog._id}`);
            })
            .catch((err)=>{
                console.error(err);
                return res.redirect("/");
            });
    }
}