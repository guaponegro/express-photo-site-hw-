const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require("./db/db")


const userControllers = require("./controllers/userControllers");
const photoControllers = require("./controllers/photoControllers");

// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use("/users", userControllers);
app.use("/photos", photoControllers);


app.get("/", (req, res) => {
    res.render("landing.ejs");
})



const port = 3000;
app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
