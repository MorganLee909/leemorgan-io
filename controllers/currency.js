module.exports = {
    /*
    GET: display page to add a new currency
    render: currency/newCurrency.eta
    */
    new: function(req, res){
        return res.render("currency/newCurrency.eta");
    }
}