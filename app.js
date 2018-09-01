var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
// so that we don't have to write the extension .ejs when providing ejs file-names.
app.set("view engine", "ejs");

// Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //Get all the campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
        }
    });
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc}
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            // Redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
     });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

// SHOW - Show more info about a specific campground
app.get("/campgrounds/:id", function(req, res){
    // Find the campground with the provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            // Render the found campground
            res.render("show", {campground: foundCampground});
        }
    });
    
});


// Server setting specific to Cloud9, change once hosted on personal server.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening...");
});