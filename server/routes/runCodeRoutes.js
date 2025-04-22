const express = require('express');
const router = express.Router();
const { runCode } = require('../controllers/runCodeController.js');

router.post('/', runCode);

module.exports = router;
