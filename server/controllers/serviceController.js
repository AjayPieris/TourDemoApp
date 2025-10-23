const Service = require('../models/service');

// Add new service (Guide)
exports.addService = async (req, res) => {
    const { title, description, category, price, location, guide } = req.body;

    try {
        const service = new Service({ title, description, category, price, location, guide });
        await service.save();
        res.status(201).json(service);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all services (Tourist)
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find().populate('guide', 'name email');
        res.status(200).json(services);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
