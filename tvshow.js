const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.connect('mongodb://localhost/tvshows')

var tvshowSchema = new Schema({
  title: { type: String },
  year: { type: Number },
  country: { type: String },
  poster: { type: String },
  seasons: { type: Number },
  genre: {
    type: String,
    enum: ['Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Comedy']
  },
  summary: { type: String }
})

module.exports = mongoose.model('TVShow', tvshowSchema)
