const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { title, description, date } = req.body;
    const event = new Event({ title, description, date });

    try {
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Error creating event' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
};
