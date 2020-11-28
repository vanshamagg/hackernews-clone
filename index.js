const express = require("express");
const { color } = require("colors");
const path = require("path");
const db = require("./src/database");
const userRouter = require("./routes/userRoute");
const newsRouter = require("./routes/news");
const exphbs = require("express-handlebars");
const news = require("./src/models/news");

// init app
const app = express();
const PORT = process.env.PORT || 5000;

// register view engine
const hbs = exphbs.create({
    helpers: {
        renderNews: function (news) {
            let hoursToMilSecs =  1 * 60 * 60 * 1000
            let output = "";

            for (let i = 0; i < news.length; i++) {
                let tiemSinceCreation = Math.floor((Date.now() - news[i].createdOn)/hoursToMilSecs)
                output += `
                            <tr id =  ${news[i]._id}>
                                <td class="serial"> ${i + 1}.</td>
                                <td> <a href="${news[i].url}"> ${news[i].title} | </a> ${tiemSinceCreation} hours ago | ${news[i].points} pts </td>
                            </tr>
                            `;
            }
            return output;
        },
    },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// body parser
app.use(express.json());

//  middleware for consoling every action
app.use((req, res, next) => {
    console.log(`${req.method}`.bold.green + `  ${req.originalUrl}`.dim);
    next();
});

// static public files
app.use(express.static("public"));

app.get("/", (req, res) => {
    (async () => {
        const coll = await news.find();
        res.render("home", {
            news: coll,
        });
    })();
});
//  mount user routes on the application
app.use("/api/user", userRouter);
app.use("/api/news", newsRouter);


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`.green);
});
