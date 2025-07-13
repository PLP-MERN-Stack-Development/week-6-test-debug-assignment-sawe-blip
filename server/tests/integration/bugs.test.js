const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../src/app');
const Bug = require('../../src/models/Bug');
const User = require('../../src/models/User');
const { generateToken } = require('../../src/utils/auth');

let mongoServer;
let token;
let userId;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  const user = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
  });

  userId = user._id;
  token = generateToken(user);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Bug.deleteMany({});
});

describe('POST /api/bugs', () => {
  it('should create a bug when authenticated', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Bug',
        description: 'Bug description',
        status: 'open'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe('Test Bug');
  });
});

describe('GET /api/bugs', () => {
  it('should return all bugs', async () => {
    await Bug.create({
      title: 'Bug 1',
      description: 'Bug 1 description',
      status: 'open',
      reporter: userId
    });

    const res = await request(app)
      .get('/api/bugs')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/bugs/:id', () => {
  it('should return a bug by ID', async () => {
    const bug = await Bug.create({
      title: 'Bug by ID',
      description: 'Specific bug',
      status: 'open',
      reporter: userId
    });

    const res = await request(app)
      .get(`/api/bugs/${bug._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Bug by ID');
  });
});

describe('PUT /api/bugs/:id', () => {
  it('should update a bug status', async () => {
    const bug = await Bug.create({
      title: 'Bug to update',
      description: 'Needs update',
      status: 'open',
      reporter: userId
    });

    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'resolved' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('resolved');
  });
});

describe('DELETE /api/bugs/:id', () => {
  it('should delete a bug by ID', async () => {
    const bug = await Bug.create({
      title: 'Bug to delete',
      description: 'To be deleted',
      status: 'open',
      reporter: userId
    });

    const res = await request(app)
      .delete(`/api/bugs/${bug._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    const deleted = await Bug.findById(bug._id);
    expect(deleted).toBeNull();
  });
});

