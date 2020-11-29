const colors = require("colors");
const express = require("express");
const news = require("../src/models/news");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
    (async () => {
        const coll = await news.find().sort({ createdOn: -1 });
        res.render("home", {
            news: coll,
        });
    })();
});

homeRouter.get("/past", (req, res) => {
    (async () => {
        try {
            const coll = await news.find().sort({ createdOn: 1});
            res.render("home", { news: coll });
        }
        catch(err) {
            res.send(err.message);
        }
    })();
});

homeRouter.get("/submit", (req, res, next) => {
    res.render("submit");
});

module.exports = homeRouter;
