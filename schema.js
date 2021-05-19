const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const users = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    country: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role:{ type: mongoose.Schema.Types.ObjectId, ref: "Role" },
})


const articles = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
})

const comments = new mongoose.Schema({
    comment: { type: String },
    commenter: { type: mongoose.Schema.Types.ObjectId }
})

const roles= new mongoose.Schema({
    role: { type: String },
    permissions:[String]
})

  users.pre("save", async function () {
    this.email = this.email.toLowerCase();
    const salt=5;
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);

});


const User = mongoose.model("User", users);
const Article = mongoose.model("Article", articles);
const Comment = mongoose.model("Comment", comments)
const Role = mongoose.model("Role", roles)

module.exports.User = User;
module.exports.Article = Article;
module.exports.Comment = Comment;
module.exports.Role = Role;