const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const http = require('http');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/offer/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//app.listen(9000);

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/getcup.by/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/getcup.by/cert.pem')
};

http.createServer((req,res) => {
    res.writeHead(301, {'Location': 'https://' + req.headers['host'] + req.url});
    res.end();
}).listen(80);;
https.createServer(options, app).listen(443);
