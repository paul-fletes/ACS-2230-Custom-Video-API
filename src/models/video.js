const mongoose = require('mongoose');
const { Schema } = mongoose;

// Add your models here.
const videoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  iso: { type: Number, required: true },
  format: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  image_url: { type: String },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;