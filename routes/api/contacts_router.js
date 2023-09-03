import express from 'express';

import contactsService from "../../models/contacts.js"

const router = express.Router()// create router 

router.get('/', async (req, res, next) => {

  try {
    const result = await contactsService.getContactsList()
    res.json(result);
    
  } catch (error) {
    next(error);
  }

})

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

export default  router
