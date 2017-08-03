let express = require('express');
let userCtrl = require('./../controllers/userCtrl');

let userRouter = express.Router();

userRouter.get('/signup', userCtrl.singup);
userRouter.get('/signin', userCtrl.signin);
userRouter.post('/login', userCtrl.login);
userRouter.post('/register', userCtrl.register);


module.exports = userRouter;