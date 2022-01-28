const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const https = require("https");
const fs = require("fs");

let app = express();

app.set("view engine", "eta");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/views`));

let mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let httpsServer = {};
if(process.env.NODE_ENV === "production"){
    httpsServer = https.createServer({
        key: fs.readFileSync("/etc/letsencrypt/live/leemorgan.io/privkey.pem", "utf8"),
        cert: fs.readFileSync("/etc/letsencrypt/live/leemorgan.io/fullchain.pem", "utf8"),
    }, app);

    app.use((req, res, next)=>{
        if(req.secure === true){
            next();
        }else{
            res.redirect(`https://${req.headers.host}${req.url}`);
        }
    });

    mongooseOptions.auth = {authSource: "admin"};
    mongooseOptions.user = "website";
    mongooseOptions.pass = process.env.MONGODB_PASS;
}

mongoose.connect("mongodb://127.0.0.1:27017/leemorgan");

app.use(compression());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

require("./routes")(app);

if(process.env.NODE_ENV === "production"){
    httpsServer.listen(process.env.HTTPS_PORT);
}
app.listen(process.env.PORT);