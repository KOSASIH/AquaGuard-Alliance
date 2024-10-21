const authController = require('../../backend/controllers/authController');
const User = require('../../backend/models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../backend/models/User');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
    describe('register', () => {
        it('should register a user successfully', async () => {
            User.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(true),
            }));

            const req = { body: { username: 'testuser', password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await authController.register(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: 'User  registered successfully' });
        });

        it('should handle registration errors', async () => {
            User.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Error')),
            }));

            const req = { body: { username: 'testuser', password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await authController.register(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error registering user' });
        });
    });

    describe('login', () => {
        it('should log in a user successfully', async () => {
            const user = { _id: '123', username: 'testuser', password: 'hashedpassword' };
            User.findOne = jest.fn().mockResolvedValue(user);
            bcrypt.compare = jest.fn().mockResolvedValue(true);
            jwt.sign = jest.fn().mockReturnValue('token');

            const req = { body: { username: 'testuser', password: 'password' } };
            const res = { json: jest.fn() };

            await authController.login(req, res);
            expect(res.json).toHaveBeenCalledWith({ token: 'token' });
        });

        it('should handle invalid credentials', async () => {
            User.findOne = jest.fn().mockResolvedValue(null);

            const req = { body: { username: 'wronguser', password: 'password' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await authController.login(req, res);
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
        });
    });
});
