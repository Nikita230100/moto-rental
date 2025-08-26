const router = require('express').Router();
const AIController = require('../controllers/Ai.controller');

router.post('/generate', AIController.generateText);

module.exports = router;