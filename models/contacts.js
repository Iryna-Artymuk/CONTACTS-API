import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

// const contactsPath = path.join(__dirname, 'db.json'); common.js
const contactsPath = path.resolve('models', 'contacts.json'); // es6 modules
const getContactsList = async () => {
  const contactsData = await fs.readFile(contactsPath);
  // кодування utf 8 можна не вказувти  json.parse вміє читати buffer
  return JSON.parse(contactsData);
};

const getContactById = async contactId => {
  const allContacts = await getContactsList();
  const contact = allContacts.find(contact => contact.id === contactId);

  return contact || null;
};

const deleteContactById = async contactId => {
  const allContacts = await getContactsList();
  const index = allContacts.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

const addContact = async data => {
  const allContacts = await getContactsList();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
 
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
};
const updateContactById = async (id, data) => {
  const allContacts = await getContactsList();
  const index = allContacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, ...data };
   await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

export default {
  addContact,
  deleteContactById,
  getContactById,
  getContactsList,
  updateContactById,
};
