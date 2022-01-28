const home = require("./controllers/home.js");

module.exports = (app)=>{
    //HOME
    app.get("/", home.landing);
    app.get("/sudoku", home.sudoku);
}