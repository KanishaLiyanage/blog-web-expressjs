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
    res.redirect("/");

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
