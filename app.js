var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
// so that we don't have to write the extension .ejs when providing ejs file-names.
app.set("view engine", "ejs");


var campgrounds = [
          {name: "Salmon Creek", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f5c67bafefbcbc_340.jpg"},
          {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f5c67bafefbcbc_340.jpg"},
          {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8671/16642502436_e6d611bcb5.jpg"},
          {name: "Salmon Creek", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f5c67bafefbcbc_340.jpg"},
          {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f5c67bafefbcbc_340.jpg"},
          {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8671/16642502436_e6d611bcb5.jpg"},
          {name: "Salmon Creek", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f5c67bafefbcbc_340.jpg"},
          {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f5c67bafefbcbc_340.jpg"},
          {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8671/16642502436_e6d611bcb5.jpg"},
          {name: "Salmon Creek", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f5c67bafefbcbc_340.jpg"},
          {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f5c67bafefbcbc_340.jpg"},
          {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8671/16642502436_e6d611bcb5.jpg"}
        ]


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});    
});

app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


// Server setting specific to Cloud9, change once hosted on personal server.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening...");
});