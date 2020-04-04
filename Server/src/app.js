'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const configRoute = require('./config/config.route');
configRoute(app);

module.exports = app