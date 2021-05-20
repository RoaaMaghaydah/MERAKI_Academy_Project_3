const e = require("express");
const { query } = require("express");
const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db");
const { User, Article, Comment, Role } = require("./schema");
const { v4: uuidv4 } = require('uuid')
const app = express();
const port = 5000;
const secret = process.env.SECRET;


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
//_____________________________________________//

const authentication = (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1];
    }
    else {
        return res.json("no taken")
    }

    jwt.verify(token, secret, (err, result) => {
        if (err) {
            return res.json(err);
        }
        if (result) {
            req.token = result;
            next();
        } else {
            res.status(403)
            res.send({ message: "The Token is invalid or expired", status: 403 })
        }
    });
}


authRouter.post("/users", (req, res) => {
    const { firstName, lastName, age, country, email, password, role } = req.body;
    const user1 = new User({ firstName, lastName, age, country, email, password, role })
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
    const arct1 = new Article({ title, description, author })
    arct1.save()
        .then((result) => {
            res.status(201);
            res.json(result);
        })
        .catch((err) => {
            res.send(err);
        });
})

authRouter.post("/roles", async (req, res) => {
    const { role, permissions } = req.body;
    const role1 = new Role({ role, permissions })
    role1.save()
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

authRouter.get("/articles/search_1", async (req, res) => {
    let articles1;
    await User.findOne({ firstName: req.query.firstName })
        .then((result) => {
            articles1 = result;
            console.log(articles1);
        })
        .catch((err) => {
            console.log(err);
        });

    Article.find({ author: articles1._id })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
});

authRouter.get("/articles/search_2", async (req, res) => {
    await Article.findOne({ _id: req.query._id }).populate("author", "firstName").exec()
        .then((result) => {

            res.json(result)

        })
        .catch((err) => {
            res.json(err)
        });


});

authRouter.put("/articles/:_id", (req, res) => {
    Article.findOneAndUpdate({ _id: req.params._id }, { title, description } = req.body, { new: true }
    )
        .then((result) => {
            res.json(result)

        })
        .catch((err) => {
            res.json(err)
        });

});

authRouter.delete("/articles/:_id", (req, res) => {
    const query = { _id: req.params._id }
    Article.deleteOne(query)
        .then(result => {
            res.send({ succes: true, massage: `Success Delete article with id => ${req.params._id}` })
        }).catch(err => { res.send(err) })
});

authRouter.delete("/articles", async (req, res) => {
    let articles1;
    await User.findOne({ firstName: req.body.firstName })
        .then((result) => {
            articles1 = result;
        })
        .catch((err) => {
            console.log(err);
        });

    Article.deleteMany({ author: articles1._id })
        .then(result => {
            res.json({ succes: true, massage: `Success Delete article with id => ${articles1.firstName}` })
        }).catch(err => { res.send(err) })

});

authRouter.post("/login", async (req, res) => {
    await User.findOne({ email: req.body.email })
        .then((result) => {
            if (result) {
                bcrypt.compare(req.body.password, result.password, async (err, result1) => {
                    let articles1;
                    await Role.findOne({ _id: result.role })
                        .then((result) => {
                            articles1 = result;
                            console.log(articles1);
                        })
                        .catch((err) => {
                            console.log(err);
                        });


                    if (result1) {
                        const payload = {
                            userId: result._id,
                            country: result.country,
                            role: { role: articles1.role, permissions: articles1.permissions }
                        };
                        console.log(payload);
                        const options = { expiresIn: '60m' };
                        const token = jwt.sign(payload, secret, options);

                        res.json(token);
                    }
                    else {
                        res.status(403)
                        res.json({ message: "The password you’ve entered is incorrect", status: 403 })
                    }
                });
            }
            else {
                res.status(404)
                res.json({ message: "The email doesn't exist", status: 404 })
            }
        })
        .catch((err) => {
            res.json(err)
        });
})

authRouter.post("/articles/:_id/comments", authentication, async (req, res) => {
    const { comment, commenter } = req.body;
    let articles1;
    await Article.findOne({ _id: req.params._id })
        .then((result) => {
            articles1 = result;
        })
        .catch((err) => {
            console.log(err);
        });
    const comment1 = new Comment({ comment, commenter: articles1.author })
    comment1.save()
        .then((result) => {
            res.status(201);
            res.json(result);
        })
        .catch((err) => {
            res.send(err);
        });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});