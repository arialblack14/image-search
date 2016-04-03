// Grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a searches schema
var searchSchema = new Schema({
  term: {
    type: String
  },
  when: {
    type: String
  }
});

// The schema is useless so far so we need to create a model using it
var Searches = mongoose.model('Search', searchSchema);

// Make this available to our node application
module.exports = Searches;
