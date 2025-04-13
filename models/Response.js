const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  fieldId: {
    type: String,
    required: true
  },
  value: mongoose.Schema.Types.Mixed, // Can be string, number, or array based on field type
});

const ResponseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  answers: [AnswerSchema],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Response', ResponseSchema);