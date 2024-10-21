const request = require('supertest');
const app = require('../../backend/app');
const User = require('../../backend/models/User');

jest.mock('../../backend/models/User');

describe('User Routes', () => {
    describe('GET /profile', () => {
        it('should retrieve a user profile successfully', async () => {
            User.findById = jest.fn().mockResolvedValue({ _id: '123', username: 'testuser' });

            const response = await request(app).get('/profile');
            expect(response.body).toEqual({ _id: '123', username: 'testuser' });
        });

        it('should handle user profile retrieval errors', async () => {
            User.findById = jest.fn().mockRejectedValue(new Error('Error'));

            const response = await request(app).get('/profile');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error fetching user profile' });
        });
    });
});
