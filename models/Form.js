// models/Form.js
const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: String
});

const FieldSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'paragraph', 'email', 'number', 'checkbox', 'radio'],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  options: [OptionSchema],
  selectedOptions: [Number],
  required: {
    type: Boolean,
    default: false
  }
});

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fields: [FieldSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Form', FormSchema);