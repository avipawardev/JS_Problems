const validateTask = (req, res, next) => {
    const { title, description, priority } = req.body;
    
    if (!title || !description || !priority) {
        return res.status(400).json({ msg: 'Incomplete Data Received' });
    }
    
    if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({ msg: 'Priority must be low, medium, or high' });
    }
    
    next();
};

module.exports = { validateTask };