const mongoose = require("mongoose");

//const localUrl = "mongodb://127.0.0.1:27017/blogDB";
//const atlasUrl = "mongodb+srv://KanishaL:kanisha123@cluster0.vfqegvn.mongodb.net/blogDB?retryWrites=true&w=majority";

const atlasUrl = process.env.ATLAS_URL;
mongoose.connect(atlasUrl, {useNewUrlParser: true});
