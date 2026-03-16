const express = require('express');
const router = express.Router();
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const result = await mongodb.getDatabase().db().collection('tasks').find();
    const tasks = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// GET task by id
router.get('/:id', async (req, res) => {
  try {
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('tasks').find({ _id: taskId });
    const tasks = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(tasks[0]);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// POST task
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const task = {
      title,
      description,
      status
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('tasks')
      .insertOne(task);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the task.');
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// PUT task
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const taskId = new ObjectId(req.params.id);

    const task = {
      title,
      description,
      status
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('tasks')
      .replaceOne({ _id: taskId }, task);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the task.');
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const taskId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection('tasks')
      .deleteOne({ _id: taskId });

    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the task.');
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
