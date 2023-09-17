import express from 'express';

import {
  vadidateAddContact,
  isValidId,
  vadidateFavorite,
} from '../../middlewars/index.js';
import {
  addContact,
  getAllContacts,
  getContactById,
} from '../../controllers/contacts/index.js';

const router = express.Router(); // create router

router.get('/', getAllContacts);

router.get('/:contactId', isValidId, getContactById);

router.post('/', vadidateAddContact, addContact);

// router.put('/:contactId', isValidId, vadidateAddContact, updateContactById);
// router.patch(
//   '/:contactId/favorite',
//   isValidId,
//   vadidateFavorite,
//   updateContactById
// );

// router.delete('/:contactId', isValidId, deleteContactById);

export default router;
