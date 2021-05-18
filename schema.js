const mongoose = require("mongoose");

const users= new mongoose.Schema({
    firstName:{ type:String},
    lastName:{type: String},
    age: {type:Number},
    country: {type:String},
    email: {type:String,required: true, unique: true},
    password:{type:String,required: true, unique: true},
})


const articles=new mongoose.Schema({
    title: { type:String},
    description: { type:String},
    author: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
    comments:[{type:mongoose.Schema.Types.ObjectId, ref: "Comment"}]
})

const comments=new mongoose.Schema({
    comment: { type:String},
    commenter: {type:mongoose.Schema.Types.ObjectId}   
})


const User = mongoose.model("User", users);
const Article = mongoose.model("Article", articles) ;
const Comment= mongoose.model("Comment",comments)

module.exports.User = User;
module.exports.Article = Article ;
module.exports.Comment = Comment;