const { loginController } = require('../controllers/login.controller');
const { registerController } = require('../controllers/register.controller');

const AuthRouter = require('express').Router();


AuthRouter.post('/login', loginController);
AuthRouter.post('/register', registerController);

module.exports = { AuthRouter };