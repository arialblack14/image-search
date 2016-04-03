var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    moment = require('moment');

// require our images model
var Searches = require('../models/searches');
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
  var getImage = request.params.search;

  // Save the search to our database using req.params and moment.js for time
  var newSearch = new Searches({ term: getImage, when: moment().format() });
  console.log(newSearch);
  newSearch.save();

  // Images search
  Bing.images(getImage, { top: 10 , skip: offset }, function(error, res, body) {
    if (error) throw error;
    // Access the objects returned
    var data = body.d.results;
    for (var i = 0; i < data.length -1; i++) {
      var title = data[i].Title; // Get the title of the image
      var url = data[i].MediaUrl; // Grab the url
      var thumbnail = data[i].Thumbnail.MediaUrl; // Grab the thumbnail
      var context = 'http://' + data[i].DisplayUrl; // And the site
      var image = { url: url, snippet: title, thumbnail: thumbnail, context: context }; // Push to our images array
      arr.push(image);
    }

    // Return the images we got from Bing
    response.send(arr);
  });
});

module.exports = imageRouter;
