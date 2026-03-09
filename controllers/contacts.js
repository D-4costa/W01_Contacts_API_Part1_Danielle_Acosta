import { ObjectId } from 'mongodb';
import { getDB } from '../models/db.js';

export const getAllContacts = async (req, res) => {
  try {
    const db = getDB();
    const contacts = await db.collection('contacts').find().toArray();

    return res.status(200).json(contacts);
  } catch (error) {
    console.error('Error retrieving contacts:', error);
    return res.status(500).json({
      message: 'Internal server error while retrieving contacts.'
    });
  }
};

export const getSingleContact = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        message: 'Invalid contact ID format.'
      });
    }

    const contact = await db
      .collection('contacts')
      .findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found.'
      });
    }

    return res.status(200).json(contact);

  } catch (error) {
    console.error('Error retrieving contact:', error);
    return res.status(500).json({
      message: 'Internal server error while retrieving contact.'
    });
  }
};