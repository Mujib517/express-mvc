
const express = require('express');
let blogRouter = express.Router();

let blogCtrl = require('../controllers/blogCtrl');

blogRouter.get('/',blogCtrl.get);
blogRouter.get('/new',blogCtrl.new);
blogRouter.get('/:id',blogCtrl.getById);
blogRouter.get('/:pageIndex/:pageSize',blogCtrl.get);


module.exports = blogRouter;




