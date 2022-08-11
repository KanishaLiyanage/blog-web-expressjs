require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const session = require("express-session");
const passport = require("passport");

const Post = require(__dirname + "/db/post");
const date = require(__dirname + "/utils/date");

const port = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require(__dirname + "/db/mongooseConnect");

const User = require(__dirname + "/db/user");

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// let posts = [];

app.get("/", function (req, res) {

    console.log("Serving sign in page...");

    res.render("signIn");

});

app.get("/home", function(req, res){

    if(req.isAuthenticated()){
        res.render("home");
        console.log("Serving home page...");
    }else{
        res.redirect("/signup");
    }

});

app.post("/accountCreate", function(req, res){

    User.register(
        {username: req.body.username, email: req.body.email, dateCreated: date.getDate()},
        req.body.password,
        function(err, user){
            if(err){
                console.log(err);
                res.redirect("/signup");
            }else{
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/home");
                });
            }
        });

});

app.post("/login", function(req, res){

    const user = new User({

        email: req.body.email,
        password: req.body.password

    });

    req.login(user, function(err){

        if(err){
            console.log(err);
        }else{

            passport.authenticate("local")(req, res, function(){

                res.redirect("/home");

            });

        }

    });

});

app.get("/logout", function(req, res){

    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect("/");
    });

});

app.get("/signup", function (req, res) {

    console.log("Serving sign up page...");

    res.render("signUp");

});

app.get("/about", function (req, res) {

    if(req.isAuthenticated()){
        res.render("about");
    }else{
        res.redirect("/signup");
    }

});

app.get("/contact", function (req, res) {

    if(req.isAuthenticated()){
        res.render("contact");
    }else{
        res.redirect("/signup");
    }

});

app.get("/compose", function (req, res) {

    if(req.isAuthenticated()){
        res.render("compose");
    }else{
        res.redirect("/signup");
    }
});

app.get("/profile", function (req, res) {

    if(req.isAuthenticated()){
        res.render("profile");
    }else{
        res.redirect("/signup");
    }

});

app.post("/compose", function (req, res) {

    let postTitle = req.body.titleGiven;
    let postContent = req.body.contentGiven;
    let postDate = date.getDate();

    const post = new Post({

        title: postTitle,
        content: postContent,
        dateAdded: postDate

    });

    post.save();
    // const post = {
    //     title: postTitle,
    //     content: postContent
    // }
    // posts.push(post);
    // console.log(posts);
    res.redirect("/home");

});

app.get("/posts/postTitle=:postTitle&postID=:postID", function (req, res) {

    const requestedID = _.lowerCase(req.params.postID);

    Post.find(function(err, posts){

        if(err){
            console.log(err);
        }else{

            posts.forEach(function (post) {

                const storedID = _.lowerCase(post._id);
        
                if (storedID === requestedID) {
                    res.render("post",
        
                        {
        
                            postTitle: post.title,
                            postContent: post.content
        
                        }
        
                    );
        
                } else {
                    //console.log("Not Found!");
                }
        
            });

        }

    });

});



app.listen(port, function () {
    console.log("Server started on port " + port + ".");
});
