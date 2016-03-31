// Grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a images schema
var imageSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  context: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// The schema is useless so far so we need to create a model using it
var Images = mongoose.model('Image', imageSchema);

// Make this available to our node application
module.exports = Images;
