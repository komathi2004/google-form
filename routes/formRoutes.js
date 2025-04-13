// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const Form = require('../models/Form');

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find().sort({ updatedAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific form
router.get('/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new form
router.post('/', async (req, res) => {
  try {
    const form = new Form({
      name: req.body.name,
      fields: req.body.fields || []
    });
    
    const savedForm = await form.save();
    res.status(201).json(savedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a form
router.put('/:id', async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        fields: req.body.fields,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    res.status(200).json(updatedForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a form
router.delete('/:id', async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    
    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }
    
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;