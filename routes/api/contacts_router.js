import express from 'express';

import {
  vadidateAddContact,
  isValidId,
  vadidateFavorite,
  authentication,
} from '../../middlewars/index.js';
import {
  addContact,
  deleteContactById,
  getAllContacts,
  getContactById,
  updateContactById,
} from '../../controllers/contacts/index.js';

const router = express.Router(); // create router

router.get('/', authentication,getAllContacts);

router.get('/:contactId', authentication,isValidId, getContactById);

router.post('/', authentication,vadidateAddContact, addContact);

router.put('/:contactId', authentication,isValidId, vadidateAddContact, updateContactById);
router.patch(
  '/:contactId/favorite',
  isValidId,
  vadidateFavorite,
  updateContactById
);

router.delete('/:contactId', authentication,isValidId, deleteContactById);

export default router;
