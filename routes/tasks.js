import express from 'express';
import {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasks.js';

const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getSingleTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
