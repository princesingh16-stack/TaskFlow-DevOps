const request = require('supertest');
const app = require('../src/app');
const taskService = require('../src/services/taskService');

describe('Task API Endpoints (/api/tasks)', () => {
  // Reset in-memory data before each test to guarantee test isolation
  beforeEach(() => {
    taskService.resetTasks();
  });

  test('GET /api/tasks returns an empty array when no tasks exist', async () => {
    const res = await request(app).get('/api/tasks');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('POST /api/tasks successfully creates a task with a valid title', async () => {
    const payload = { title: 'Complete DevOps Assignment' };

    const res = await request(app)
      .post('/api/tasks')
      .send(payload)
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Complete DevOps Assignment');
    expect(res.body).toHaveProperty('createdAt');
    expect(typeof res.body.id).toBe('number');
  });

  test('POST /api/tasks rejects a missing title with HTTP 400', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({})
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/required/i);
  });

  test('POST /api/tasks rejects an empty or whitespace title with HTTP 400', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '   ' })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/empty/i);
  });

  test('GET /api/tasks returns a list containing all created tasks', async () => {
    // Seed tasks via POST
    await request(app).post('/api/tasks').send({ title: 'First Task' });
    await request(app).post('/api/tasks').send({ title: 'Second Task' });

    const res = await request(app).get('/api/tasks');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0].title).toBe('First Task');
    expect(res.body[1].title).toBe('Second Task');
  });

  test('GET /api/tasks/:id returns the task and HTTP 200 when task exists', async () => {
    // Create a task first
    const createRes = await request(app)
      .post('/api/tasks')
      .send({ title: 'Task to retrieve' });
    const taskId = createRes.body.id;

    const res = await request(app).get(`/api/tasks/${taskId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', taskId);
    expect(res.body).toHaveProperty('title', 'Task to retrieve');
    expect(res.body).toHaveProperty('createdAt');
  });

  test('GET /api/tasks/:id returns HTTP 404 when task does not exist', async () => {
    const res = await request(app).get('/api/tasks/999');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/not found/i);
  });
});
