const home = require("./controllers/home.js");
const blog = require("./controllers/blog.js");
const gallery = require("./controllers/gallery.js");

module.exports = (app)=>{
    //HOME
    app.get("/", home.landing);
    app.get("/sudoku", home.sudoku);
    app.get("/birthday", home.birthday);

    //BLOG
    app.get("/blog/new", blog.add);
    app.get("/blog/:id", blog.display);
    app.post("/blog/create", blog.create);

    //GALLERY
    app.get("/gallery/:gallery", gallery.display);
    app.get("/gallery/new", gallery.new);

    app.post("/gallery", gallery.create);

    //FILES
    app.get("/thumbnails/:file", (req, res)=>res.sendFile(`${__dirname}/thumbnails/${req.params.file}`));
    app.get("/galleryImages/:file", (req, res)=>res.sendFile(`${__dirname}/galleryImages/${req.params.file}`));
}