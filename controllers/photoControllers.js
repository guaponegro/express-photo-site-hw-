const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Photo = require("../models/photos");

// Index Route
router.get("/", async (req, res) => {
    try{
        const allPhotos = await Photo.find()
        res.render("photos/index.ejs", {photos: allPhotos});
    } catch(err){
        res.send(err)
    }
});

// New Route
router.get('/new',async (req, res) => {
    try{
        res.render('photos/new.ejs');
    } catch(err){
        res.send(err)
    }
});

// Route to Post Created Photos
router.post('/', async (req, res) => {
    try{
        await Photo.create(req.body)
        res.redirect("/photos")
    } catch(err){
        res.send(err)
    }
});

// Edit Route
router.get('/:id/edit', async (req, res) => {
    try{
        const foundPhotos = await Photo.findByIdAndUpdate(req.params.id, req.body)
        res.render('photos/edit.ejs', {photos: foundPhotos});
    } catch(err){
        res.send(err)
    }
});

// Show route
router.get('/:id', async (req, res) => {
    try{
        const foundPhotos = await Photo.findById(req.params.id)
        res.render('photos/show.ejs', {photos: foundPhotos});
    } catch(err){
        res.send(err)
    }
});


// Delete Route 
router.delete('/:id', async (req, res) => {
    try{
        await Photo.findByIdAndDelete(req.params.id)
        res.redirect("/photos")
    } catch(err){
        res.send(err)
    }
});


// Route to Update Model 
router.put('/:id', async (req, res) => {
    try{
        await Photo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.redirect("/photos")
    } catch(err){
        res.send(err)
    }
})


module.exports = router;