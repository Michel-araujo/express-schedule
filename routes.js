
import express from 'express'
import { homeController } from './src/controlles/homeController.js'
import {
    authController,
    loginController,
    logoutController,
    registerController,
    registrationController
} from './src/controlles/accountController.js';

const routes = express.Router();

// ROUTES
routes.get('/', loginController) // LOGIN
routes.post('/login/authentication', authController)
routes.get('/register', registerController)
routes.post('/login/register', registrationController)
routes.get('/logout', logoutController)

routes.get('/home', homeController)

export default routes