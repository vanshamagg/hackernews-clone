const express = require("express");
const { color } = require("colors");
const { userRouter } = require("./routes/userRoute");

const app = express();
const PORT = process.env.port || 5000;

// middleware for consoling every action
app.use((req, res, next) => {
    console.log(`${req.method}`.bold.green + `  ${req.originalUrl}`.dim);
    next();
});
app.get("/", (req, res) => {
    res.send("Welcome to our api");
});

//  mount user routes on the application
app.use("/", userRouter);

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`.green);
});
