/**
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 * Module to establish connection with the MongoDB Atlas Database
 */

let mongoose = require("mongoose");
const colors = require('colors');
const dotenv =  require('dotenv').config();
/**
 * Database URI
 */
const URI = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PWD}@cluster0.d2rss.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
/**
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 */
/**
 * The Database class reponsible for establishing 
 * connecting with the database
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 */
class Database {
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

module.exports = new Database();
