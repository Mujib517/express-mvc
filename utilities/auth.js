let session = require('express-session');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let userCtrl = require('../controllers/userCtrl');

//dependency injection
function configureAuth(app) {
    app.use(session({ secret: 'mypwd' }));
    app.use(passport.initialize());
    app.use(passport.session());


    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id);
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, function (email, password, done) {
        userCtrl.login(email, password, function (err, user) {
            if (err) done(err);
            else done(null, user.email);
        });
    }));
}

module.exports = configureAuth;

