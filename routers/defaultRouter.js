const express = require('express');
let defaultRouter = express.Router();

defaultRouter.get('/', (req, res) => {
    res.render("pages/home",{message:"Hello MVC"}); //view
});

defaultRouter.get('/about', (req, res) => {
    res.render("pages/about");
});

module.exports = defaultRouter;

