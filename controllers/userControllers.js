const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const Photo = require("../models/photos")

// Index Route
router.get("/", async (req, res) => {
    try{
        const allUsers = await User.find();
        res.render("users/index.ejs", {users: allUsers});
    } catch(err){
        res.send(err)
    }
});

// New Route
router.get('/new', async (req, res) => {
    try{
        res.render('users/new.ejs');
    } catch(err){
        res.send(err)
    }
});

// Route to Post Created Users
router.post('/', async (req, res) => {
    try{
        await User.create(req.body)
        res.redirect("/users")
    } catch(err){
        res.send(err)
    }
});

// Edit Route
router.get('/:id/edit', async (req, res) => {
    try{
        const foundUsers = await User.findByIdAndUpdate(req.params.id, req.body)
        res.render('users/edit.ejs', {users: foundUsers});
    } catch(err){
        res.send(err)
    }
});

// Show route
router.get('/:id', async (req, res) => {
    try{
        const foundUsers = await User.findById(req.params.id)
        const foundPhotos = await Photo.findById(req.params.id)
        res.render('users/show.ejs', {
            users: foundUsers,
            photos: foundPhotos
        });
    }catch(err){
        res.send(err)
    }
});


// Delete Route 
router.delete('/:id', async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.redirect("/users");
    } catch(err){
        res.send(err)
    }
  });


// Route to Update Model 
router.put('/:id', async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.redirect("/users")
    } catch(err){
        res.send(err)
    }
})


module.exports = router;