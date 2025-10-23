const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    guide: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['tour', 'van', 'tool'], required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', serviceSchema);
