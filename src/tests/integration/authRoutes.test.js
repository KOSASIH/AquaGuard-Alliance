const request = require('supertest');
const app = require('../../backend/app');
const User = require('../../backend/models/User');
const bcrypt = require('bcrypt');

jest.mock('../../backend/models/User');
jest.mock('bcrypt');

describe('Auth Routes', () => {
    describe('POST /register', () => {
        it('should register a user successfully', async () => {
            User.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(true),
            }));

            const response = await request(app).post('/register').send({ username: 'testuser', password: 'password' });
            expect(response.status).toBe(201);
            expect(response.body).toEqual({ message: 'User   registered successfully' });
        });

        it('should handle registration errors', async () => {
            User.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Error')),
            }));

            const response = await request(app).post('/register').send({ username: 'testuser', password: 'password' });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error registering user' });
        });
    });

    describe('POST /login', () => {
        it('should log in a user successfully', async () => {
            const user = { _id: '123', username: 'testuser', password: 'hashedpassword' };
            User.findOne = jest.fn().mockResolvedValue(user);
            bcrypt.compare = jest.fn().mockResolvedValue(true);

            const response = await request(app).post('/login').send({ username: 'testuser', password: 'password' });
            expect(response.body).toEqual({ token: expect.any(String) });
        });

        it('should handle invalid credentials', async () => {
            User.findOne = jest.fn().mockResolvedValue(null);

            const response = await request(app).post('/login').send({ username: 'wronguser', password: 'password' });
            expect(response.status).toBe(401);
            expect(response.body).toEqual({ error: 'Invalid credentials' });
        });
    });
});
