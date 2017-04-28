const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./config/db');
const app = express();
const port = 3333;
const wallets = require('./server/api/models/wallets.model');
const user = require('./server/api/models/user.model');
const session = require('express-session');

mongoose.Promise = global.Promise;
mongoose.connect(db.url);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('front/app'));


app.use(session({
  secret: 'pxjoke',
  resave: false,
  saveUninitialized: false
}));

require('./server/api/routes/wallets.routes')(app);
require('./server/api/routes/users.routes')(app);

app.listen(port);