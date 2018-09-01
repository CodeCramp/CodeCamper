var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    seedDB          = require("./seeds"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    //Get all the campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
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
    res.render("campgrounds/new");
});

// SHOW - Show more info about a specific campground
app.get("/campgrounds/:id", function(req, res){
    // Find the campground with the provided ID and populate them with their comments
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            // Render the found campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});


// ====================
// COMMENTS ROUTES
// ====================
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
         if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
         if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
             });
        }
    });
});



// Server setting specific to Cloud9, change once hosted on personal server.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening...");
});