
import express from 'express'
import { homeController } from './src/controlles/homeController.js'
import {
    authController,
    loginController,
    registerController,
    registrationController
} from './src/controlles/accountController.js';

const routes = express.Router();

// ROUTES
routes.get('/', loginController)
routes.post('/login/authentication', authController)

routes.get('/home', homeController)
routes.get('/register', registerController)
routes.post('/login/register', registrationController)

export default routes