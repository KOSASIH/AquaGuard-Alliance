const User = require('../models/User');

exports.getUser Profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
};
