const e = require("express");
const { query } = require("express");
const express = require("express");
const db = require("./db");
const { User, Article } = require("./schema");
const { v4: uuidv4 } = require('uuid')
const app = express();
const port = 5000;


const authRouter = express.Router();
app.use(express.json());
app.use("/auth", authRouter);

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

app.get("/articles/search_2", (req, res) => {
    const arr = [];
    const id = req.query.id;
    console.log(id);
    articles.find((element, index) => {
        if (element.id.toString() === id.toString()) {
            res.status(200);
            arr.push(articles[index])
            res.json(arr);
        }
    });
});

app.get("/articles/search_1", (req, res) => {
    const arr = [];
    const author = req.query.author;
    console.log("geeeet", author);
    articles.find((element, index) => {
        if (element.author === author) {
            res.status(200);
            arr.push(articles[index])
        }
    });
    res.json(arr);
})

app.post("/articles", (req, res) => {
    const addArticles = { id: uuidv4(), title: req.body.title, description: req.body.description, author: req.body.author };
    articles.push(addArticles);
    res.status(201);
    res.json(addArticles);
})

app.put("/articles/:id", (req, res) => {
    const updateArc = req.params.id;
    articles.find((element, index) => {
        if (element.id.toString() === updateArc.toString()) {
            articles[index].title = req.body.title;
            articles[index].description = req.body.description;
            articles[index].author = req.body.author;
            res.status(200);
            res.json(articles[index]);
        }


    });
});

app.delete("/articles/:id", (req, res) => {
    const deleteArc = req.params.id;
    articles.find((elem, index) => {
        if (elem.id.toString() === deleteArc.toString()) {
            articles.splice(index, 1)
        }
        deleteMassege = { succes: true, massage: `Success Delete article with id => ${deleteArc}` }
        res.json(deleteMassege)
    });

});

app.delete("/articles", (req, res) => {
    let deleteArc = req.body.author;
    deleteMassege = "not found";
    articles.find((element, index) => {
        if (element.author === deleteArc) {
            articles.splice(index, 1)
            deleteMassege = { succes: true, massage: `Success Delete article with id => ${deleteArc}` }
        }
    });

    res.json(deleteMassege)
});

authRouter.post("/users", (req, res) => {
    const { firstName, lastName, age, country, email, password } = req.body;
    const user1 = new User({ firstName, lastName, age, country, email, password })
    user1
        .save()
        .then((result) => {
            res.status(201);
            res.json(result);
        })
        .catch((err) => {
            res.send(err);
        });
})

authRouter.post("/articles", async (req, res) => {
    const { title, description, author } = req.body;
    let articles1;
    await User.findOne({ firstName: "roaa" })
        .then((result) => {
            articles1 = result;
            console.log(articles1);
        })
        .catch((err) => {
            console.log(err);
        });
    const arct1 = new Article({ title, description, author: articles1._id })
    arct1.save()
        .then((result) => {
            res.status(201);
            res.json(result);
        })
        .catch((err) => {
            res.send(err);
        });
})


authRouter.get("/articles", (req, res) => {

    Article.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

authRouter.get("/articles/search_1",async (req, res) => {
    let articles1;
    await User.findOne({ firstName:req.query.firstName })
        .then((result) => {
            articles1 = result;
            console.log(articles1);
        })
        .catch((err) => {
            console.log(err);
        });

    Article.find({ author:articles1._id})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

authRouter.get("/articles/search_2",async (req, res) => {
    let articles1;
    await Article.find({author:req.query.author}).populate("author","firstName").exec()
        .then((result) => {
            articles1 = result;
            res.json(result)
            console.log(articles1);
        })
        .catch((err) => {
            console.log(err);
        });

 
});

authRouter.put("/articles/:id",async (req, res) => {
    let articles1;
    await User.findOne({ author:req.params.author})
        .then((result) => {
            articles1 = result;
            console.log(articles1);
        })
        .catch((err) => {
            console.log(err);
        });
        let query={author:articles1._id}
   
    Article.findOneAndUpdate(query, { title, description, } = req.body, { new: true }
    )
        .then(result => { res.json(result) }).catch(err => { res.send(err) })    
});









app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});