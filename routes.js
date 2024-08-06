
import express from 'express'
import { homeController } from './src/controlles/homeController.js'
import {
    authController,
    loginController,
    logoutController
} from './src/controlles/loginController.js'
import {
    registerController,
    accountCreateController
} from './src/controlles/registerController.js';

const routes = express.Router();

// SERVICES
routes.post('/login/authentication', authController)
routes.post('/login/register', accountCreateController)
routes.get('/logout', logoutController)

// ROUTES LOGGED OUT
routes.get('/', loginController)
routes.get('/register', registerController)

// ROUTES LOGGED IN
routes.get('/home', homeController)

export default routes