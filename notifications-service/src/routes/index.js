const { Router } = require('express');
const HTTPSTATUS = require('http-status');

// Import the notification routes
const notificationRoutes = require('../routes/notification_routes.js');

// Initialize Express Router
const router = Router();



/**
 * Root API Route.
 * Provides an overview message and points to documentation.
 */
router.get('/', (req, res) => {
    res.status(HTTPSTATUS.OK).json({ message: 'API documentation is available at /api/api-docs' });
});

/**
 * Health Check Endpoint.
 * Returns the health status of the API.
 */
router.get('/health', (req, res) => {
    res.status(HTTPSTATUS.OK).json({ status: 'UP', timestamp: new Date() });
});

// Use the notifications for `/auth` path
router.use('/notifications', notificationRoutes);

module.exports = router;