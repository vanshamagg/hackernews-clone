const { Router } = require("express");
const express = require("express");
const { users } = require("../users");

let userRouter = express.Router();

// Route for accessing all users
userRouter.get("/user", (req, res, next) => {
    res.json(users);
});

// Route for accessing user on the basis of ID
userRouter.get("/user/:id", (req, res, next) => {
    let tempUser = users.find((user) => (user.id ===  parseInt(req.params.id) ));
    if(tempUser)
        res.json(tempUser);
    else 
        throw new Error('User Not Found').message;
});
module.exports.userRouter = userRouter;
