import express from 'express';
import {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getSingleContact);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
