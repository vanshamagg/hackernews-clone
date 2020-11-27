const express = require("express");
const { color } = require("colors");
const { userRouter } = require("./routes/userRoute");
const path = require("path");
const db = require("./src/database");

// init app
const app = express();
const PORT = process.env.PORT || 5000;

// body parser
app.use(express.json());

//  middleware for consoling every action

app.use((req, res, next) => {
    console.log(`${req.method}`.bold.green + `  ${req.originalUrl}`.dim);

    next();
});

// static public files
app.use(express.static("public"));

//  mount user routes on the application
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`.green);
});
