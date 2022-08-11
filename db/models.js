const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String,
    dateCreated: String,

});

const User = mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({

    title: String,
    content: String,
    dateAdded: String,
    postedUser: userSchema

});

const Post = mongoose.model("Post", postSchema);

module.exports = User;
module.exports = Post;