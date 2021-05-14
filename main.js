const express = require("express");
const {v4 : uuidv4} = require('uuid')
const app = express();
const port = 5000;

app.use(express.json());


const articles = [
    {
        id: 1,
        title: 'How I learn coding?',
        description:
            'Lorem, Quam, mollitia.',
        author: 'Jouza',
    },
    {
        id: 2,
        title: 'Coding Best Practices',
        description:
            'Lorem, ipsum dolor sit, Quam, mollitia.',
        author: 'Besslan',
    },
    {
        id: 3,
        title: 'Debugging',
        description:
            'Lorem, Quam, mollitia.',
        author: 'Jouza',
    },
];

app.get("/articles", (req, res) => {
    res.status(200);
    res.json(articles)
})

app.get("/articles/:id", (req, res) => {
    const arr = [];
    const id = req.params.id;
    console.log(id);
    articles.find((element, index) => {
        if (element.id.toString() === id.toString()) {
            res.status(200);
            arr.push(articles[index])
            res.json(arr);
        }
        else {
            res.status(404);
            res.json("id articals not found");
        }
    });
});

app.get("/articles/author/:author", (req, res) => {
    const arr = [];
    const author = req.params.author;
    console.log(author);


    articles.find((element, index) => {
        if (element.author.toString() === author.toString()) {
            res.status(200);
            arr.push(articles[index])
        }
    });
    res.json(arr);
})

app.post("/articles", (req, res) => {
    const addArticles = { id: uuidv4() , title: req.body.title, description: req.body.description, author: req.body.author };
    articles.push(addArticles);
    res.status(201);
    res.json(addArticles);
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});