let express = require('express');
let commentCtrl = require('./../controllers/commentCtrl');
let commentRouter = express.Router();

commentRouter.post('/', commentCtrl.add);

module.exports = commentRouter;