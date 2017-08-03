let User = require('./../models/userModel');

let userCtrl = function () {

    let login = function (req, res) {
        let email = req.body.email;
        let password = req.body.password;

        //select username from User where username=name and password=pwd
        User.findOne({ email: email, password: password }, function (err, user) {
            if (!user) res.redirect("/failed");
            else res.redirect("/success");
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

    return {
        login: login,
        register: register,
        singup: signup,
        signin: signin
    }
};

module.exports = userCtrl();