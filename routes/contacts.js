import express from 'express';
import { getAllContacts, getSingleContact } from '../models/contact.js';

const router = express.Router();

router.get('/', getAllContacts);

router.get('/:id', getSingleContact);

export default router;
