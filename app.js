var express = require("express");
var app = express();

// so that we don't have to write the extension .ejs when providing ejs file-names.
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
});


// Server setting specific to Cloud9, change once hosted on personal server.
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening...");
});