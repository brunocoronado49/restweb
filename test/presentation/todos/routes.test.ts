import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('TODO route testing', () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo1 = { text: 'Hello World' };
  const todo2 = { text: 'Hello World 2' };

  test('Should return TODOS api/todos', async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const { body } = await request(testServer.app).get('/api/todos').expect(200);

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
  });

  test('Should return a TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app).get(`/api/todos/${todo.id}`).expect(200);

    expect(body).toEqual({ id: todo.id, text: todo.text, completedAt: todo.completedAt });
    expect(body.completedAt).toBe(null);
  });

  test('Should return a 404 Not found api/todos/:id', async () => {
    const { body } = await request(testServer.app).get('/api/todos/999').expect(400);

    expect(body).toEqual({ error: 'TODO with id: 999 not found' });
  });

  test('Should create a new TODO api/todos', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send(todo1).expect(201);

    expect(body).toEqual({ id: expect.any(Number), text: todo1.text, completedAt: null });
  });

  test('Should return an error if text is not valid api/todos', async () => {
    const { body } = await request(testServer.app).post('/api/todos').send({}).expect(400);

    expect(body).toEqual({ error: 'Text property is required.' });
  });

  test('Should update a TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ text: 'Hello updated', completedAt: '2026-10-06' })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: 'Hello updated',
      completedAt: '2026-10-06T00:00:00.000Z',
    });
  });

  test('Should return 404 if TODO not found api/todos/:id', async () => {
    const { body } = await request(testServer.app)
      .put('/api/todos/999')
      .send({ text: 'Hello updated', completedAt: '2026-10-06' })
      .expect(404);

    expect(body).toEqual({ error: 'TODO with id: 999 not found' });
  });

  test('Should update date of a TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ completedAt: '2026-10-06' })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: '2026-10-06T00:00:00.000Z',
    });
  });

  test('Should delete a TODO api/todos/:id', async () => {
    const todo = await prisma.todo.create({ data: todo1 });

    const { body } = await request(testServer.app).delete(`/api/todos/${todo.id}`).expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo.text,
      completedAt: todo.completedAt,
    });
  });
});
