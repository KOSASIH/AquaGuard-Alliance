const userController = require('../../backend/controllers/userController');
const User = require('../../backend/models/User');

jest.mock('../../backend/models/User');

describe('User  Controller', () => {
    describe('getUserProfile', () => {
        it('should retrieve a user profile successfully', async () => {
            User.findById = jest.fn().mockResolvedValue({ _id: '123', username: 'testuser' });

            const req = { user: { id: '123' } };
            const res = { json: jest.fn() };

            await userController.getUserProfile(req, res);
            expect(res.json).toHaveBeenCalledWith({ _id: '123', username: 'testuser' });
        });

        it('should handle user profile retrieval errors', async () => {
            User.findById = jest.fn().mockRejectedValue(new Error('Error'));

            const req = { user: { id: '123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await userController.getUserProfile(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching user profile' });
        });
    });
});
