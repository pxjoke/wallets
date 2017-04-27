const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/db');
const app = express();
const port = 3333;
const models = require('./app/api/models/wallets.model');
mongoose.Promise = global.Promise;
mongoose.connect(db.url);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./app/api/routes/wallets.routes')(app);

app.listen(port);