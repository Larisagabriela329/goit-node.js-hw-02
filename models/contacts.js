const Contact = require("../models/contact");

async function listContacts() {
  return await Contact.find();
}

async function getById(contactId) {
  return await Contact.findById(contactId);
}

async function addContact(data) {
  return await Contact.create(data);
}

async function removeContact(contactId) {
  return await Contact.findByIdAndDelete(contactId);
}

async function updateContact(contactId, body) {
  return await Contact.findByIdAndUpdate(contactId, body, { new: true });
}

async function updateStatusContact(contactId, { favorite }) {
  return await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
}

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
