let mongoose = require("mongoose");
const colors = require('colors');
const dotenv =  require('dotenv').config();

const URI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PWD}@cluster0.d2rss.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
class DummyDatabase {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log("Connection Established with Atlas Database".green.bold))
            .catch((err) => console.log("DATABASE ERROR -> ".red + err.message.red.bold));
    }
}

module.exports = new DummyDatabase();
