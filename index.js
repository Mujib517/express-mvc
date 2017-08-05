const express = require('express');
const hbs = require('express-hbs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

let defaultRouter = require('./routers/defaultRouter');
let blogRouter = require('./routers/blogRouter');
let commentRouter = require('./routers/commentRouter');
let userRouter = require('./routers/userRouter');

let configureAuth = require('./utilities/auth');
let middlewares = require('./utilities/middlewares');

let app = express();

let port = process.env.PORT || 3000;

//arrow functions. ES6 standard
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

configureAuth(app);

// mongoose.connect("mongodb://localhost/blogsDb", { useMongoClient: true });

mongoose.connect("mongodb://admin:admin@ds125053.mlab.com:25053/blgsdb", { useMongoClient: true });


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/lib"));

app.set('view engine', 'hbs');

app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/views/index.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views'
}));

app.use('/', defaultRouter);
app.use('/users', userRouter);

app.use(middlewares.isAuthenticated);
app.use(middlewares.noCache);

app.use(function (req, res, next) {
    res.locals.isLoggedin = true;
    next();
});



app.use('/blogs', blogRouter);
app.use('/blogs/comments', commentRouter);