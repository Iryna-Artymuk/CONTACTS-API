import express from 'express';

import contactsControler from '../../controllers/contact_controler.js';
const router = express.Router(); // create router

router.get('/', contactsControler.getAllContacts);

router.get('/:contactId', contactsControler.getContactById);

router.post('/', contactsControler.addContact);

router.put('/:contactId', contactsControler.updateContactById);

router.delete('/:contactId', contactsControler.deleteContactById);

export default router;
