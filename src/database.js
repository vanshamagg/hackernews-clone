let mongoose = require("mongoose");
const colors = require('colors');

const URI = "mongodb+srv://admin:admin@cluster0.d2rss.mongodb.net/dummy?retryWrites=true&w=majority";

class DummyDatabase {
    constructor() {
        this._connect();
    }

    _connect() {
        mongoose
            .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log("Connection Established with Atlas Database".green.bold))
            .catch((err) => console.log("Database Connection Error".red.bold));
    }
}

// module.exports = new DummyDatabase();
let db = new DummyDatabase();