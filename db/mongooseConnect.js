const mongoose = require("mongoose");

const localUrl = "mongodb://127.0.0.1:27017/blogDB";

mongoose.connect(localUrl, {useNewUrlParser: true});
