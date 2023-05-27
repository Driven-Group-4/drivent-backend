import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import { createEvent, createUser } from '../factories';
import { createLocation } from '../factories/location-factory';
import { createActivity, postUserActivity } from '../factories/activities-factory';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /activities', () => {
  it('Should respond with status 404 if no token id given', async () => {
    const response = await server.get('/activities');

    expect(response.status).toBe(401);
  });

  describe('When token is valid', () => {
    it('Should respond with status 200', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });
  });
});

describe('POST /activities', () => {
  it('Should respond with status 404 if no token id given', async () => {
    const response = await server.post('/activities');

    expect(response.status).toBe(401);
  });

  describe('When token is valid', () => {
    it('Should respond with status 201', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const event = await createEvent();
      const location = await createLocation(event.id);
      const activity = await createActivity(location.id);

      const response = await server
        .post('/activities')
        .set('Authorization', `Bearer ${token}`)
        .send({ activityId: activity.id, startsAt: activity.startsAt });

      expect(response.status).toBe(201);
    });
  });
});

describe('DELETE /activities', () => {
  it('Should respond with status 404 if no token id given', async () => {
    const response = await server.delete('/activities');

    expect(response.status).toBe(401);
  });

  describe('When token is valid', () => {
    it('Should respond with status 200', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const event = await createEvent();
      const location = await createLocation(event.id);
      const activity = await createActivity(location.id);
      const schedule = await postUserActivity(user.id, activity.id, activity.startsAt);

      const response = await server.delete(`/activities/${activity.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });
  });
});
