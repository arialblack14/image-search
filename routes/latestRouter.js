var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Access our mongodb
var Searches = require('../models/searches');

var latestRouter = express.Router();
latestRouter.use(bodyParser.json());

latestRouter.route('/')
.get(function(req, res, next) {
  Searches.find({}, function(err, search) {
    if (err) throw err;

    // var result = ({ term: search.term, when: search.createdAt });
    res.json(search);
    // Get the 10 latest entries in reverse order according to following SO question
    // http://stackoverflow.com/questions/4421207/mongodb-how-to-get-the-last-n-records
  }).sort({_id: -1} ).limit(10);
});

module.exports = latestRouter;
