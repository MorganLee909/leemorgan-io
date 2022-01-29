const express = require("express");
const mongoose = require("mongoose");
const compression = require("compression");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const esbuild = require("esbuild");
const https = require("https");
const fs = require("fs");
const eta = require("eta")

let app = express();

app.engine("eta", eta.renderFile);
app.set("view engine", "eta");
app.set("views", `${__dirname}/views`);
app.use(express.static(`${__dirname}/views`));

let mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let esbuildOptions = {
    entryPoints: [
        "./views/landing/js/landing.js",
        "./views/landing/css/landing.css"
    ],
    bundle: true,
    minify: false,
    outdir: "./views/bundles/",
    outbase: "./views/",
    sourcemap: true
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

    esbuildOptions.minify = true;
    esbuildOptions.sourcemap = false;
}

mongoose.connect("mongodb://127.0.0.1:27017/leemorgan");
esbuild.buildSync(esbuildOptions);

app.use(compression());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(fileUpload({
    limits: {fileSize: 5 * 1024 * 1024},
}));

require("./routes")(app);

if(process.env.NODE_ENV === "production"){
    httpsServer.listen(process.env.HTTPS_PORT);
}
app.listen(process.env.PORT);