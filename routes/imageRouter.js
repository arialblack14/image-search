var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// require our images model
var Images = require('../models/images');
// So as to grab the Bing Key
var config = require('../config');

// Start our imageRouter
var imageRouter = express.Router();
imageRouter.use(bodyParser.json());

// Require Bing API
var Bing = require('node-bing-api')({accKey: config.bingKey});

imageRouter.route('/:search')
.get(function(request, response, next) {
  var arr = [];
  var offset = request.query.offset || 0;

  // Images search
  Bing.images(request.params.search, { top: 10 , skip: offset }, function(error, res, body) {
    if (error) throw error;
    var data = body.d.results;
    console.log(data[0]);
    for (var i = 0; i < data.length -1; i++) {
      var title = data[i].Title; // Get the title of the image
      var url = data[i].MediaUrl; // Grab the url
      var thumbnail = data[i].Thumbnail.MediaUrl; // Grab the thumbnail
      var context = 'http://' + data[i].DisplayUrl; // And the site
      var image = { url: url, snippet: title, thumbnail: thumbnail, context: context }; // Push to our images array
      arr.push(image);
    }
    response.send(arr);
  });
});

module.exports = imageRouter;
