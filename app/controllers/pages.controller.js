exports.index = (req, res) => {
    const user = req.session.user;
    console.log(req.session.user);
    if (user) {
        res.redirect('/wallets');
        return;
    }

    res.render('index', {title: 'Welcome Page'});
};