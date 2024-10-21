const request = require('supertest');
const app = require('../../backend/app');
const Event = require('../../backend/models/Event');

jest.mock('../../backend/models/Event');

describe('Event Routes', () => {
    describe('POST /events', () => {
        it('should create an event successfully', async () => {
            Event.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(true),
            }));

            const response = await request(app).post('/events').send({ title: 'Test Event', description: 'Test Description', date: new Date() });
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.any(Object));
        });

        it('should handle event creation errors', async () => {
            Event.mockImplementation(() => ({
                save: jest.fn().mockRejectedValue(new Error('Error')),
            }));

            const response = await request(app).post('/events').send({ title: 'Test Event', description: 'Test Description', date: new Date() });
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error creating event' });
        });
    });

    describe('GET /events', () => {
        it('should retrieve events successfully', async () => {
            Event.find = jest.fn().mockResolvedValue([{ title: 'Test Event', description: 'Test Description', date: new Date() }]);

            const response = await request(app).get('/events');
            expect(response.body).toEqual([{ title: 'Test Event', description: 'Test Description', date: expect.any(Date) }]);
        });

        it('should handle event retrieval errors', async () => {
            Event.find = jest.fn().mockRejectedValue(new Error('Error'));

            const response = await request(app).get('/events');
            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Error fetching events' });
        });
    });
});
