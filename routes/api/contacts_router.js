import express from 'express';

import contactsControler from '../../controllers/contact_controler.js';
import {
  vadidateAddContact,
  isValidId,
  vadidateFavorite,
} from '../../middlewars/index.js';
const router = express.Router(); // create router

router.get('/', contactsControler.getAllContacts);

router.get('/:contactId', isValidId, contactsControler.getContactById);

router.post('/', vadidateAddContact, contactsControler.addContact);

router.put(
  '/:contactId',
  isValidId,
  vadidateAddContact,
  contactsControler.updateContactById
);
router.patch(
  '/:contactId/favorite',
  isValidId,
  vadidateFavorite,
  contactsControler.updateContactById
);

router.delete('/:contactId', isValidId, contactsControler.deleteContactById);

export default router;
