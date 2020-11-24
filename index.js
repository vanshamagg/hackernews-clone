/**
 * @author Vansham Aggarwal <vanshamagg@gmail.com>
 * A simple HTTP server, that serves the index.html
 * when the URL is called with or without the '/'
 */

const http = require("http");
const colors = require('colors');
const fs = require("fs");

const hostName = "127.0.0.1";
const port = 8001;

const server = http.createServer();
server.on("request", (req, res) => {
    console.log(`GET ${req.url}`.green);
    if (req.url === "/") {
        fs.readFile("index.html", 'utf8', (err, data) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        });
    }
});
server.listen(port, hostName);

console.log(`Server Started at http://${hostName}:${port}`.blue.bgWhite);
