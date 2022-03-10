const Currency = require("../models/currency.js");

module.exports = {
    /*
    GET: display page to add a new currency
    render: currency/newCurrency.eta
    */
    new: function(req, res){
        return res.render("currency/newCurrency.eta");
    },

    /*
    POST: create a new currency
    req.body = {
        password: Lee Morgan password
        location: Country
        type: coin || paper
        year: year
        comment: any additional comments
        name: currency name
        currencyCode: currency code, if any
        value: value of currency in base
    }
    req.files = {
        frontImage: File
        backImage: File
    }
    */
    create: function(req, res){
        if(req.body.password !== process.env.SITE_PASSWORD) return res.redirect("/");

        let createImage = (image)=>{
            let fileString = `/currencyimages/${createId(25)}.jpg`;
            image.mv(`${__dirname}/..${fileString}`);
            return fileString;
        }

        let currency = new Currency({
            location: req.body.location,
            type: req.body.type,
            year: parseInt(req.body.year),
            comment: req.body.comment,
            name: req.body.name,
            currencyCode: req.body.currencyCode,
            value: parseInt(value * 100),
            frontImage: createImage(req.files.frontImage),
            backImage: createImage(req.files.backImage)
        });

        currency.save()
            .then((currency)=>{
                return res.redirect("/");
            })
            .catch((err)=>{
                console.error(err);
                return res.redirect("/");
            });
    }
}