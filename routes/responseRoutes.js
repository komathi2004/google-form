const express = require('express');
const router = express.Router();
const Response = require('../models/Response');
const Form = require('../models/Form');

// Get all responses for a specific form
router.get('/form/:formId', async (req, res) => {
  try {
    const responses = await Response.find({ formId: req.params.formId });
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific response
router.get('/:id', async (req, res) => {
  try {
    const response = await Response.findById(req.params.id);
    
    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a new response
router.post('/', async (req, res) => {
  try {
    // Verify the form exists
    const form = await Form.findById(req.body.formId);
    
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    const response = new Response({
      formId: req.body.formId,
      answers: req.body.answers
    });
    
    const savedResponse = await response.save();
    res.status(201).json(savedResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a response
router.delete('/:id', async (req, res) => {
  try {
    const deletedResponse = await Response.findByIdAndDelete(req.params.id);
    
    if (!deletedResponse) {
      return res.status(404).json({ message: 'Response not found' });
    }
    
    res.status(200).json({ message: 'Response deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;