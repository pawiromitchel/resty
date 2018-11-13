const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Auto load all our routes into the application.
const normalizedPath = path.join(__dirname, "./server/routes");
fs.readdirSync(normalizedPath).forEach(function(file) {
  require("./server/routes/" + file)(app);
});

// When a route doesnt exist, show the requester this message
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;
