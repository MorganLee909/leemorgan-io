module.exports = {
    landing: function(req, res){
        return res.render("landing/landing.eta");
    },

    sudoku: function(req, res){
        return res.render("sudoku/sudoku.eta");
    }
}