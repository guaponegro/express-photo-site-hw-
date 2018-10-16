const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Photo = require("../models/photos");

// Index Route
router.get("/", (req, res) => {
    Photo.find({}, (err, allPhotos) => {
        if(err){
            console.log(err);
        }else {
            console.log(allPhotos);
            res.render("photos/index.ejs", {photos: allPhotos});
        }
    });
});

// New Route
router.get('/new', (req, res) => {
    res.render('photos/new.ejs');
  });

// Route to Post Created Users
router.post('/', (req, res) => {
    console.log(req.body, ' this is where our info from the fruit form will live');
    Photo.create(req.body, (err, createdPhotos) => {
        if(err){
            console.log(err)
        } else {
            console.log(createdPhotos);
            res.redirect('/photos')
        }   
    });
});

// Edit Route
router.get('/:id/edit', (req, res) => {
    Photo.findById(req.params.id, (err, foundPhotos) => {
        res.render('photos/edit.ejs', {photos: foundPhotos});
    });
});

// Show route
router.get('/:id', (req, res) => {
    console.log(req.params);
    Photo.findById(req.params.id, (err, foundPhotos) => {
      console.log(foundPhotos, ' foundPhotos')
        res.render('photos/show.ejs', {photos: foundPhotos});
    });
});


// Delete Route 
router.delete('/:id', (req, res) => {
    console.log(req.params.id, ' id in delete route');
    Photo.findByIdAndRemove(req.params.id, (err, deletePhotos) => {
      res.redirect('/photos');
    });
  });


// Route to Update Model 
router.put('/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    Photo.findByIdAndUpdate(req.params.id, req.body, (err, updatedModel) => {
      res.redirect('/photos')
    });
})


module.exports = router;