var express = require("express");
var app = express();

// so that we don't have to write the extension .ejs when providing ejs file-names.
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
          {name: "Salmon Creek", image: "https://pixabay.com/get/e83db50929f0033ed1584d05fb1d4e97e07ee3d21cac104496f5c67bafefbcbc_340.jpg"},
          {name: "Granite Hill", image: "https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104496f5c67bafefbcbc_340.jpg"},
          {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8671/16642502436_e6d611bcb5.jpg"}
        ]
    res.render("campgrounds", {campgrounds: campgrounds});    
});


// Server setting specific to Cloud9, change once hosted on personal server.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening...");
});