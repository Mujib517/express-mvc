
const express = require('express');
let blogRouter = express.Router();

let blogCtrl = require('../controllers/blogCtrl');

blogRouter.get('/',blogCtrl.get);

module.exports = blogRouter;




