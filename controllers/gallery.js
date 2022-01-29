module.exports = {
    /*
    GET: Display page to create new gallery
    ETA: gallery/new.eta
    */
    new: function(req, res){
        return res.render("gallery/new.eta");
    }
}