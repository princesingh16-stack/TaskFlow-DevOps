/**
 * In-memory Task Service
 * Handles data storage and business logic for tasks without requiring a database.
 */

// In-memory task list
let tasks = [];
let nextId = 1;

/**
 * Retrieve all tasks from memory
 * @returns {Array} List of all tasks
 */
const getAllTasks = () => {
  return [...tasks];
};

/**
 * Create a new task and store it in memory
 * @param {string} title - The title of the task
 * @returns {Object} The created task object
 */
const createTask = (title) => {
  const newTask = {
    id: nextId++,
    title: title.trim(),
    createdAt: new Date().toISOString()
  };
  tasks.push(newTask);
  return newTask;
};

/**
 * Reset in-memory tasks
 * Useful for ensuring test isolation between test runs
 */
const resetTasks = () => {
  tasks = [];
  nextId = 1;
};

module.exports = {
  getAllTasks,
  createTask,
  resetTasks
};
