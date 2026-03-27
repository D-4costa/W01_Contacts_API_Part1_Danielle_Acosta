import express from 'express';
import {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasks.js';

import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getSingleTask);

router.post('/', isAuthenticated, createTask);
router.put('/:id', isAuthenticated, updateTask);
router.delete('/:id', isAuthenticated, deleteTask);

export default router;
