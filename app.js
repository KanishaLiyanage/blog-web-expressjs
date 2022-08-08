const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    console.log("serving...");
    
    res.render("home");

});





app.listen(port, function(){
    console.log("Server started on port " + port + ".");
});