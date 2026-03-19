import { ObjectId } from 'mongodb';
import { getDB } from '../models/db.js';

// GET ALL
export const getAllContacts = async (req, res) => {
  try {
    const db = getDB();
    const contacts = await db.collection('contacts').find().toArray();
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving contacts' });
  }
};

// GET ONE
export const getSingleContact = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const contact = await db.collection('contacts')
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving contact' });
  }
};

// POST
export const createContact = async (req, res) => {
  try {
    const db = getDB();
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await db.collection('contacts').insertOne({
      firstName, lastName, email, favoriteColor, birthday
    });

    return res.status(201).json({ id: result.insertedId });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating contact' });
  }
};

// PUT
export const updateContact = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: { firstName, lastName, email, favoriteColor, birthday } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating contact' });
  }
};

// DELETE
export const deleteContact = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const result = await db.collection('contacts')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting contact' });
  }
};
