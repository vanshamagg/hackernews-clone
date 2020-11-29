const colors = require("colors");
const express = require("express");
const news = require("../src/models/news");
const user = require("../src/models/users");
const session = require("express-session");

const homeRouter = express.Router();

// HOME / NEW
homeRouter.get("/", (req, res) => {
    (async () => {
        const coll = await news.find().sort({ createdOn: -1 });
        res.render("home", {
            news: coll,
            session: req.session,
        });
    })();
});

// PAST
homeRouter.get("/past", (req, res) => {
    (async () => {
        try {
            const coll = await news.find().sort({ createdOn: 1 });
            res.render("home", { news: coll });
        } catch (err) {
            res.send(err.message);
        }
    })();
});

// SUBMIT A POST
homeRouter.get("/submit", (req, res, next) => {
    if (req.session.user) res.render("submit");
    else res.redirect("/login-signup");
});

// LOGIN / SIGNUP
homeRouter.get("/login-signup", (req, res, next) => {
    res.render("login-signup");
});

// LOGIN ATTEMPT WITH CREDS
homeRouter.post("/login", (req, res, next) => {
    console.log(typeof req.body.email);
    (async () => {
        try {
            const doc = await user.find({ email: req.body.email });
            console.log("User exists".green);
            if (req.body.password === doc[0].password) {
                req.session.user = doc[0]._id;
                req.session.name = doc[0].firstName;
                console.log(`User ${doc[0].firstName} Logged In`.green.bold);
                res.redirect("/");
            } else {
                let error = "Wrong Password";
                res.send(error);
            }
        } catch (err) {
            res.send(err.message);
            console.log(err.message.bold.red);
        }
    })();
});

// LOGOUT

homeRouter.get("/logout", (req, res, next) => {
    req.session.user = null;
    req.session.name = null;
    res.redirect("/");
});
module.exports = homeRouter;
