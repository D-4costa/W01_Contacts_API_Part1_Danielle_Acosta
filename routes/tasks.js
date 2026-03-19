import express from 'express';
import { getDB } from '../models/db.js';
import { ObjectId } from 'mongodb';

const router = express.Router();


// ✅ GET all tasks
router.get('/', async (req, res, next) => {
  try {
    const db = getDB();
    const tasks = await db.collection('tasks').find().toArray();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});


// ✅ GET task by id
router.get('/:id', async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format.' });
    }

    const task = await db.collection('tasks').findOne({ _id: new ObjectId(id) });

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});


// ✅ POST task
router.post('/', async (req, res, next) => {
  try {
    const db = getDB();
    const { title, description, status } = req.body;

    // 🔥 VALIDATION
    if (!title || !description || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (typeof title !== 'string' || typeof description !== 'string') {
      return res.status(400).json({ message: 'Invalid data types.' });
    }

    const newTask = { title, description, status };

    const result = await db.collection('tasks').insertOne(newTask);

    res.status(201).json({ id: result.insertedId });

  } catch (error) {
    next(error);
  }
});


// ✅ PUT task
router.put('/:id', async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format.' });
    }

    if (!title || !description || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const updatedTask = { title, description, status };

    const result = await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedTask }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task updated successfully' });

  } catch (error) {
    next(error);
  }
});


// ✅ DELETE task
router.delete('/:id', async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID format.' });
    }

    const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });

  } catch (error) {
    next(error);
  }
});

export default router;
