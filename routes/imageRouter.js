var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
// require our images model
var Images = require('../models/images');

// Start our imageRouter
var imageRouter = express.Router();
imageRouter.use(bodyParser.json());

imageRouter.route('/:placeholder')
.get(function(req, res, next) {

});

module.exports = imageRouter;
