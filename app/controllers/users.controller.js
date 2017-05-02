const mongoose = require('mongoose');
const crypto = require('crypto');
const User = mongoose.model('User');

exports.login = function (req, res, next) {
    const session = req.session;

    if (session.user) {
        console.log('User is already logged in');
        console.log(req.session);
        return res.redirect('/wallets');
    }

    User.findOne({email: req.body.email}, (err, user) => {
        const renderWrongLogin = () =>
            res.render('login', {user: {email: req.body.email}, error: {message: 'Email or password is incorrect'}});

        if (!user) {
            console.log(err);
            renderWrongLogin();
            return;
        }

        if (user.password === hash(req.body.password)) {
            console.log("User password is ok");
            session.user = user;
            res.redirect('/wallets');
            return;
        }

        renderWrongLogin();

    });
};

exports.create = function (req, res) {
    const userParams = {
        name: req.body.name,
        email: req.body.email,
        password: hash(req.body.password)
    };

    const user = new User(userParams);

    user.save((err, user) => {
        if (err) {
            let error = {};
            let user = {
                name: req.body.name,
                email: req.body.email
            };

            if (err.code === 11000) {
                error.message = 'User with such email is already exists!';
            } else {
                error.message = 'Internal server error!'
            }

            res
                .status(500)
                .render('registration', {user, error});
            return;
        }

        console.log("User created");
        res.redirect('/login');
    });

};

exports.logout = function (req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        console.log(`User logged out`);
    }

    res.redirect('/')
};

function hash(text) {
    return crypto
        .createHash('sha1')
        .update(text)
        .digest('base64');
}

exports.checkUser = (req, res, next) => {
    const session = req.session;

    if (!session.user) {
        res.redirect('/login');
        return;
    }

    req.user = session.user;
    next();
};