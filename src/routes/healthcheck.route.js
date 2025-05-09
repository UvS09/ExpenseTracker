const healthCheckController = require('../controllers/healthcheck.controller');

const HealthCheckRoute = require('express').Router();

HealthCheckRoute.get('/healthCheck', healthCheckController);

module.exports = { HealthCheckRoute };