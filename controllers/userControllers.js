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

// Edit Route
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, foundUsers) => {
        res.render('users/edit.ejs', {users: foundUsers});
    });
});

// Show route
router.get('/:id', (req, res) => {
    console.log(req.params);
    User.findById(req.params.id, (err, foundUsers) => {
      console.log(foundUsers, ' foundUsers')
        res.render('users/show.ejs', {users: foundUsers});
    });
});


// Delete Route 
router.delete('/:id', (req, res) => {
    console.log(req.params.id, ' id in delete route');
    User.findByIdAndRemove(req.params.id, (err, deleteUsers) => {
      res.redirect('/users');
    });
  });


// Route to Update Model 
router.put('/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    User.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
      res.redirect('/users')
    });
})


module.exports = router;