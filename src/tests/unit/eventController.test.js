const eventController = require('../../backend/controllers/eventController');
const Event = require('../../backend/models/Event');

jest.mock('../../backend/models/Event');

describe('Event Controller', () => {
    describe('createEvent', () => {
        it('should create an event successfully', async () => {
            Event.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(true),
            }));

            const req = { body: { title: 'Test Event', description: 'Test Description', date: new Date() } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await eventController.createEvent(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.any(Object));
        });

        it('should handle event creation errors', async () => {
            Event.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Error')),
            }));

            const req = { body: { title: 'Test Event', description: 'Test Description', date: new Date() } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await eventController.createEvent(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error creating event' });
        });
    });

    describe('getEvents', () => {
        it('should retrieve events successfully', async () => {
            Event.find = jest.fn().mockResolvedValue([{ title: 'Test Event', description: 'Test Description', date: new Date() }]);

            const req = {};
            const res = { json: jest.fn() };

            await eventController.getEvents(req, res);
            expect(res.json).toHaveBeenCalledWith([{ title: 'Test Event', description: 'Test Description', date: expect.any(Date) }]);
        });

        it('should handle event retrieval errors', async () => {
            Event.find = jest.fn().mockRejectedValue(new Error('Error'));

            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await eventController.getEvents(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error fetching events' });
        });
    });
});
