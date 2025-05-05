const Contact = require("./ContactModel");

async function listContacts() {
  const contacts = await Contact.find();
  console.log("Fetched contacts from DB:", contacts); // 👈 Add this
  return contacts;
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
