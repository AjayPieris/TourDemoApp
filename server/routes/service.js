const express = require('express');
const router = express.Router();
const { addService, getServices } = require('../controllers/serviceController');

// Guide adds service
router.post('/add', addService);

// Tourist gets all services
router.get('/', getServices);

module.exports = router;
