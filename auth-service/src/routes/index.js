const { Router } = require('express');
const HTTPSTATUS = require('http-status');

// Initialize Express Router
const router = Router();

/**
 * Define the root route of the API.
 * Provides a quick message and points to the API documentation.
 */
router.get('/', (req, res) => {
    res.status(HTTPSTATUS.OK).json({ message: 'API documentation is available at /api/api-docs' });
});

router.get('/health', (req, res) => {
    res.status(HTTPSTATUS.OK).json({ status: 'UP', timestamp: new Date() });
});

module.exports = router;