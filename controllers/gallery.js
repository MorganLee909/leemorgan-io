const Gallery = require("../models/gallery.js");

const helper = require("../helper.js");

module.exports = {
    /*
    GET: Display page to create new gallery
    ETA: gallery/new.eta
    */
    new: function(req, res){
        return res.render("gallery/newGallery.eta");
    },

    /*
    POST: create a new
    req.body = {
        password: Lee Morgan's password
        title: title of the gallery
        tags: comma seperated strings
        coordinates: string representing coordiantes
    }
    req.files = [images]
    redirect: /gallery/<gallery id>
    */
    create: function(req, res){
        if(req.body.password !== process.env.SITE_PASSWORD) return res.redirect("/");

        let coords = req.body.coordinates.split(", ");
        let gallery = new Gallery({
            title: req.body.title,
            tags: req.body.tags.split(","),
            images: [],
            location: {
                type: "Point",
                coordinates: [parseFloat(coords[0]), parseFloat(coords[1])]
            }
        });

        let handleImage = (fileData)=>{
            let fileString = `/galleryImages/${helper.fileId(25)}.jpg`;
            fileData.mv(`${__dirname}/..${fileString}`);
            gallery.images.push(fileString)
        }

        if(req.files.images.length === undefined) handleImage(req.files.images);
        for(let i = 0; i < req.files.images.length; i++){
            handleImage(req.files.images[i]);
        };

        gallery.save()
            .then((gallery)=>{
                return res.redirect(`/gallery/${gallery._id}`);
            })
            .catch((err)=>{
                console.error(err);
                return res.redirect("/");
            });
    },

    /*
    GET: display a single gallery
    req.params = {
        gallery: Gallery id
    }
    data = Gallery
    render: gallery/display.eta
    */
    display: function(req, res){
        Gallery.findOne({_id: req.params.gallery})
            .then((gallery)=>{
                return res.render("gallery/displayGallery.eta", {gallery: gallery});
            })
            .catch((err)=>{
                console.error(err);
                return res.redirect("/");
            });
    }
}