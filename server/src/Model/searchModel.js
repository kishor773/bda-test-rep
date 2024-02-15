var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  searchHistory: [
    {
      serviceName: String,
      serviceType: String,
      serviceLocation: [
        {
      locationId: Number,
      locationName: String,
      state: String,
      city: String,
      pincode: Number,
      country: String,
      coords: {
        latitude: Number,
        longitude: Number,
        speed: {
          type: Number,
          required: false
        },
        accuracy: {
          type: Number,
          required: false
        },
      }}]
    }
  ]
});

  module.exports = mongoose.model('searches', searchSchema);
