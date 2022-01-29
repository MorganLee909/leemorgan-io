const home = require("./controllers/home.js");
const blog = require("./controllers/blog.js");

module.exports = (app)=>{
    //HOME
    app.get("/", home.landing);
    app.get("/sudoku", home.sudoku);
    app.get("/birthday", home.birthday);

    //BLOG
    app.get("/blog/new", blog.add);
    app.get("/blog/:id", blog.display);
    app.post("/blog/create", blog.create);

    //FILES
    app.get("/thumbnails/:file", (req, res)=>res.sendFile(`${__dirname}/thumbnails/${req.params.file}`));
}