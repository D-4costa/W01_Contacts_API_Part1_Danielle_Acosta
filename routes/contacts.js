import express from 'express';
import mongodb from '../models/db.js';
import { ObjectId } from 'mongodb';

const router = express.Router();


// ✅ GET ALL CONTACTS
router.get('/', async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('contacts').find();
    const contacts = await result.toArray();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});


// ✅ GET SINGLE CONTACT
router.get('/:id', async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find({ _id: contactId });

    const contact = await result.toArray();

    if (contact.length === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact[0]);
  } catch (error) {
    next(error);
  }
});


// ✅ CREATE CONTACT (POST)
router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // 🔥 VALIDATION
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'firstName, lastName, and email are required' });
    }

    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
      return res.status(400).json({ message: 'Names must be strings' });
    }

    if (typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const newContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .insertOne(newContact);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});


// ✅ UPDATE CONTACT (PUT)
router.put('/:id', async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // 🔥 VALIDATION
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'firstName, lastName, and email are required' });
    }

    if (typeof firstName !== 'string' || typeof lastName !== 'string') {
      return res.status(400).json({ message: 'Names must be strings' });
    }

    if (typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const updatedContact = {
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday,
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne({ _id: contactId }, updatedContact);

    if (response.modifiedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    next(error);
  }
});


// ✅ DELETE CONTACT
router.delete('/:id', async (req, res, next) => {
  try {
    const contactId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .deleteOne({ _id: contactId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
