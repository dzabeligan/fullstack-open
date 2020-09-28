const { KnownTypeNamesRule } = require('graphql');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 2, unique: true },
  published: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  genres: [{ type: String, required: true }],
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', schema);
