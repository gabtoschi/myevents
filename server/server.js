const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');

//const api = require('./routes/api');

require('./api/config/database');
require('./api/config/passport');

const app = express();
const router = require('./api/routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError')
      res.status(401).res.json({"message" : err.name + ": " + err.message});
});

app.use(passport.initialize());
app.use('/api', router);
  
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));