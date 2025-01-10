const express = require('express');
const { getStats } = require('../controllers/controller.js');

const router = express.Router();

router.get('/stats', getStats);

module.exports = router;
