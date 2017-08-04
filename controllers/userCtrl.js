let User = require('./../models/userModel');


let userCtrl = function () {

    let login = function (email, password, done) {
        User.findOne({ email: email, password: password }, function (err, user) {
            if (!user) done("Wrong username or password");
            else done(null, user);
        });
    };

    let register = function (req, res) {

        let user = new User(req.body);

        user.save(function (err, user) {
            if (!err)
                res.redirect("/success");
            else {
                if (err.errmsg.indexOf("duplicate key error index") > -1) {
                    res.redirect("/failed");
                }
                else {
                    res.redirect("/failed");
                }

            }
        });
    };

    let signup = function (req, res) {
        res.render("pages/singup");
    };

    let signin = function (req, res) {
        res.render("pages/singin");
    };

    let logout = function (req, res) {
        req.logout();
        res.redirect('/users/login');
    };

    return {
        login: login,
        register: register,
        singup: signup,
        signin: signin,
        logout: logout
    }
};

module.exports = userCtrl();