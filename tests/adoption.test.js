import request from 'supertest';
import app from '../server.js';

describe('Adoption Routes', () => {
  it('GET /api/adoptions debe devolver estado 200', async () => {
    const res = await request(app).get('/api/adoptions');
    expect(res.statusCode).toBe(200);
  });

  it('POST /api/adoptions debe crear adopción', async () => {
    const res = await request(app)
      .post('/api/adoptions')
      .send({ userId: '...', petId: '...' });
    expect(res.statusCode).toBe(201);
  });
});
