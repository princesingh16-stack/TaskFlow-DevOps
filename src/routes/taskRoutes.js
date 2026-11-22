const express = require('express');
const router = express.Router();
const taskService = require('../services/taskService');

/**
 * GET /api/tasks
 * Returns all existing tasks in an array.
 * Returns an empty array when no tasks exist.
 */
router.get('/', (req, res) => {
  const tasks = taskService.getAllTasks();
  return res.status(200).json(tasks);
});

/**
 * GET /api/tasks/:id
 * Returns the task matching the supplied ID.
 * Returns HTTP 200 with the task if found.
 * Returns HTTP 404 with a meaningful JSON error if the task does not exist.
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const task = taskService.getTaskById(id);

  if (!task) {
    return res.status(404).json({
      error: `Task with ID ${id} not found.`
    });
  }

  return res.status(200).json(task);
});

/**
 * POST /api/tasks
 * Accepts JSON containing a task title.
 * Validates input, creates a new task, and returns HTTP 201.
 */
router.post('/', (req, res) => {
  const { title } = req.body;

  // Validation: Check if title is provided and is a non-empty string
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({
      error: 'Task title is required and must not be empty.'
    });
  }

  const createdTask = taskService.createTask(title);
  return res.status(201).json(createdTask);
});

module.exports = router;
