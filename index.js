const express = require('express');
const hbs = require('express-hbs');
const mongoose = require('mongoose');

let defaultRouter = require('./routers/defaultRouter');
let blogRouter = require('./routers/blogRouter');

let app = express();

let port = process.env.PORT || 3000;

//arrow functions. ES6 standard
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect("mongodb://localhost/blogsDb", { useMongoClient: true });

app.use(express.static(__dirname + "/lib"));

app.set('view engine', 'hbs');

app.engine('hbs', hbs.express4({
    defaultLayout: __dirname + '/views/index.hbs',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views'
}));

app.use('/', defaultRouter);
app.use('/blogs', blogRouter);