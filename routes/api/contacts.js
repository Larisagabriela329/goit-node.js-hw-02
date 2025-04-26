const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await getById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: `missing required ${error.details[0].path[0]} field` });
    return;
  }

  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  if (contact) {
    res.status(200).json({ message: 'contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }

  const contact = await updateContact(id, req.body);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

module.exports = router;
