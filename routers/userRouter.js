let express = require('express');
const passport = require('passport');

let userCtrl = require('./../controllers/userCtrl');

let userRouter = express.Router();

userRouter.get('/signup', userCtrl.singup);
userRouter.get('/signin', userCtrl.signin);
userRouter.post('/register', userCtrl.register);
userRouter.get('/logout', userCtrl.logout);

userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/blogs',
    failureRedirect: '/login',
}));


module.exports = userRouter;