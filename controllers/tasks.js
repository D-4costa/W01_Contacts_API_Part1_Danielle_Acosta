import { ObjectId } from 'mongodb';
import { getDB } from '../models/db.js';


// ✅ GET ALL TASKS
export const getAllTasks = async (req, res, next) => {
  try {
    const db = getDB();
    const tasks = await db.collection('tasks').find().toArray();
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};


// ✅ GET SINGLE TASK
export const getSingleTask = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const task = await db.collection('tasks')
      .findOne({ _id: new ObjectId(id) });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};


// ✅ CREATE TASK
export const createTask = async (req, res, next) => {
  try {
    const db = getDB();
    const { title, description, status } = req.body;

    // 🔥 VALIDATION
    if (!title || !description || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (typeof title !== 'string' || typeof description !== 'string') {
      return res.status(400).json({ message: 'Invalid data types' });
    }

    const result = await db.collection('tasks').insertOne({
      title,
      description,
      status
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    next(error);
  }
};


// ✅ UPDATE TASK
export const updateTask = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    if (!title || !description || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await db.collection('tasks').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description, status } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    next(error);
  }
};


// ✅ DELETE TASK
export const deleteTask = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    const result = await db.collection('tasks')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
