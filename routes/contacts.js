import express from 'express';
import {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contacts.js';

import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getSingleContact);

router.post('/', isAuthenticated, createContact);
router.put('/:id', isAuthenticated, updateContact);
router.delete('/:id', isAuthenticated, deleteContact);

export default router;
