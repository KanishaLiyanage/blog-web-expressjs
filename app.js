const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const port = process.env.PORT || 3000;

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let posts = [];

app.get("/", function (req, res) {

    console.log("Serving home page...");

    res.render("home",
        {
            postsArray: posts,
        }
    );

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

app.post("/compose", function(req, res){

    let postTitle = req.body.titleGiven;
    let postContent = req.body.contentGiven;

    const post = {

        title: postTitle,
        content: postContent

    }

    posts.push(post);
    // console.log(posts);
    res.redirect("/");

});

app.get("/posts/:postName", function(req, res){

    const requestedTitle = _.lowerCase(req.params.postName);

    posts.forEach(function(post){

        const storedTitle = _.lowerCase(post.title);

        if(storedTitle === requestedTitle){
            // console.log("Match Found!");
            res.render("post",

                {

                    postTitle: post.title,
                    postContent: post.content

                }

            );

        }else{
            // console.log("Not Found!");
        }

    });

});


app.listen(port, function () {
    console.log("Server started on port " + port + ".");
});