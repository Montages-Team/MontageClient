const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

app = express();
app.use(serveStatic(__dirname + "/dist"));

const port = process.env.PORT || 5000;

app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "/dist/index.html");
});

app.listen(port);
console.log('server started '+ port);
