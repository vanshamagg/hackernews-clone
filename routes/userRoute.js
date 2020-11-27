const colors = require("colors");
const express = require("express");
const { users } = require("../users");
const userModel = require("../src/models/users");

let userRouter = express.Router();

// Middleware for accessing all users
userRouter.get("/", (req, res, next) => {
    userModel
        .find()
        .then((coll) => res.status(200).send(coll))
        .catch((err) => res.status(400).send(err.message));
});

// Middlware for posting persistent data (CREATE)
userRouter.post("/", (req, res) => {
    if (!req.body.name || !req.body.phone) {
        let formatError = new Error("Missing Properties while adding USER");
        res.send({ message: formatError.message });
        throw formatError.message.red.bold;
    }
    (async () => {
        let newId;
        await userModel.countDocuments().then((data) => (newId = data));
        let msg = new userModel({
            id: newId + 1,
            name: req.body.name,
            phone: req.body.phone,
        });
        await msg
            .save()
            .then((doc) => res.send({ message: "Added Successfully", newUser: doc }))
            .catch((err) => res.send(err.message));
    })();
});

// Middleware for accessing user on the basis of ID (READ)
userRouter.get("/:id", (req, res, next) => {
    userModel
        .find({ id: req.params.id })
        .then((doc) => res.send(doc))
        .catch((err) => res.send(err.message));
});

// Middleware for updating a user (UPDATE)
userRouter.put("/:id", (req, res, next) => {
    userModel
        .findOneAndUpdate({ id: req.params.id }, { name: req.body.name, phone: req.body.phone }, { new: true, runValidators: true, useFindAndModify: true })
        .then((doc) => res.send(doc))
        .catch((err) => res.status(400).send(err.message));
});

// Middleware for deleting a user (DELETE)
userRouter.delete("/:id", (req, res, next) => {
   
    userModel
        .findOneAndDelete({ id: req.params.id })
        .then((doc) => res.send("User Deleted"))
        .catch((err) => res.send(err.message));
});

module.exports.userRouter = userRouter;
