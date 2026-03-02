import express from 'express';
import { getDB } from '../models/db.js';
import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = getDB();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    res.status(500).json({ message: 'Internal server error while retrieving contacts.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID format.' });
    }

    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Error retrieving contact:', error);
    res.status(500).json({ message: 'Internal server error while retrieving contact.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db.collection('contacts').insertOne(newContact);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: 'Internal server error while creating contact.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID format.' });
    }

    const updatedContact = { firstName, lastName, email, favoriteColor, birthday };
    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedContact }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact updated successfully.' });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ message: 'Internal server error while updating contact.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid contact ID format.' });
    }

    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Internal server error while deleting contact.' });
  }
});

export default router;
