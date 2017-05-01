const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const expressValidator = require('express-validator');
const MongoStore = require('connect-mongo')(session);

const port = 3333;
const app = express();
const dbConfig = require('./config/db');
const wallet = require('./app/models/wallet.model');
const transaction = require('./app/models/transaction.model');
const user = require('./app/models/user.model');

const db = mongoose
    .connect(dbConfig.url);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(express.static('app/public'));

app.set('views', 'app/views');
app.set('view engine', 'pug');

app.use(session({
    store:  new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

require('./app/routes/wallets.routes')(app);
require('./app/routes/users.routes')(app);
require('./app/routes/index.routes')(app);

app.listen(port);