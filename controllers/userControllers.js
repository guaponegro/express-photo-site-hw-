const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");

// Index Route
router.get("/", (req, res) => {
    User.find({}, (err, allUsers) => {
        if(err){
            console.log(err);
        }else {
            console.log(allUsers);
            res.render("users/index.ejs", {users: allUsers});
        }
    });
});

// New Route
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
  });

// Route to Post Created Users
router.post('/', (req, res) => {
    console.log(req.body, ' this is where our info from the fruit form will live');
    User.create(req.body, (err, createdUsers) => {
        if(err){
            console.log(err)
        } else {
            console.log(createdUsers);
            res.redirect('/users')
        }   
    });
});






module.exports = router;