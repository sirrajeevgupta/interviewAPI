const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  codeSnippet: String,
  domain: String,
  referenceUrl: String,
  timeStamp: String,
});

module.exports = mongoose.model('Question', questionsSchema);
