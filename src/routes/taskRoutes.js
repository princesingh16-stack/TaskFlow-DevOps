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
