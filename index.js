const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const expressValidator = require('express-validator');
const MongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 3000;
const app = express();
const dbConfig = require('./config/db');
const wallet = require('./models/wallet.model');
const transaction = require('./models/transaction.model');
const user = require('./models/user.model');

const db = mongoose
    .connect(dbConfig.url);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(express.static('public'));

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(session({
    store:  new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

require('./routes/wallets.routes')(app);
require('./routes/users.routes')(app);
require('./routes/index.routes')(app);

app.listen(port);