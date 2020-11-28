const colors = require("colors");
const express = require("express");
const user = require("../src/models/users");

let userRouter = express.Router();

// Middleware for accessing all users
userRouter.get("/", (req, res, next) => {
    user.find()
        .then((coll) => res.status(200).send(coll))
        .catch((err) => res.status(400).send(err.message));
});

// Middlware for posting persistent data (CREATE)
userRouter.post("/", (req, res) => {
    let user1 = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        createdOn: Date(),
        password: req.body.password,
    });

    user1
        .save()
        .then((doc) => res.send(doc))
        .catch((err) => res.send(err.message));
});

// Middleware for accessing user on the basis of firstname (READ)
userRouter.get("/:firstname", (req, res, next) => {
    console.log(req.params.firstname);
    user.find({ firstName: req.params.firstname })
        .then((doc) => res.send(doc))
        .catch((err) => res.send(err.message));
});

// Middleware for updating a user on the basis of _id (UPDATE)
userRouter.patch("/:id", (req, res, next) => {
    user.findOneAndUpdate(
        { _id: req.params.id },
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        },
        { new: true, runValidators: true, useFindAndModify: true }
    )
        .then((doc) => res.send(doc))
        .catch((err) => res.status(400).send(err.message));
});

// Middleware for deleting a user (DELETE)
userRouter.delete("/:id", (req, res, next) => {
    user.findOneAndDelete({ id: req.params.id })
        .then((doc) => res.send("User Deleted"))
        .catch((err) => res.send(err.message));
});

module.exports = userRouter;
