const mongoose = require("mongoose");

const users= new mongoose.Schema({
    firstName:{ type:String},
    lastName:{type: String},
    age: {type:number},
    country: {type:string},
    email: {type:string},
    password:{type:string},
})


const articles=new mongoose.Schema({
    title: { type:String},
    description: { type:String},
    author: { type: Schema.Types.ObjectId, ref: "User"
 }
})

const User = mongoose.model("User", users);
const article = mongoose.model("article", articles) ;

module.exports.User = User;
module.exports.article = article ;
