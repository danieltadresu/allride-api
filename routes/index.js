const express = require('express');
const router = express.Router();
const controller = require('../controllers/get');

router.get('/', controller.get);

module.exports = router;
