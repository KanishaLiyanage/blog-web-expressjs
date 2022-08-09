const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

require(__dirname + "/db/mongooseConnect");
const Post = require(__dirname + "/db/post");
const User = require(__dirname + "/db/user");
const date = require(__dirname + "/utils/date");

const port = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// let posts = [];

app.get("/", function (req, res) {

    console.log("Serving sign in page...");

    res.render("signIn");

});

app.post("/accountCreate", function(req, res){

    let postName = req.body.name;
    let postEmail = req.body.email;
    let postPassword = req.body.password;
    let postDate = date.getDate();

    const user = new User({

        name: postName,
        email: postEmail,
        password: postPassword,
        dateCreated: postDate

    });

    user.save();
    res.redirect("/home");

});

app.post("/accountValidate", function(req, res){

    const requestedEmail = req.body.email;
    const requestedPassword = req.body.password;

    User.find(function(err, users){

        if(err){
            console.log(err);
        }else{

            users.forEach(function(user) {

                const storedEmail = user.email;
                const storedPassword = user.password;
        
                if (storedEmail == requestedEmail && storedPassword === requestedPassword) {
                    res.redirect("/home");
        
                } else {
                    res.redirect("/");
                }
        
            });

        }

    });
    console.log(requestedEmail);
    console.log(requestedPassword);

});

app.get("/home", function (req, res) {

    console.log("Serving home page...");

    Post.find(function (err, posts) {

        if (err) {
            console.log(err);
        } else {
            res.render("home",
                {
                    postsArray: posts
                }
            );
        }

    });

});

app.get("/signup", function (req, res) {

    console.log("Serving sign up page...");

    res.render("signUp");

});

app.get("/about", function (req, res) {

    console.log("Serving about us page...");

    res.render("about",
        {

        }
    );

});

app.get("/contact", function (req, res) {

    console.log("Serving contact us page...");

    res.render("contact",
        {

        }
    );

});

app.get("/compose", function (req, res) {

    console.log("Serving compose us page...");

    res.render("compose");

});

app.get("/profile", function (req, res) {

    console.log("Serving profile page...");

    res.render("profile",
        {

        }
    );

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
