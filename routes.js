
import express from 'express'
import { autentication, homeController, loginController, showcaseController, showMsgController } from './src/controlles/homeController.js'

const routes = express.Router();

// ROUTES
routes.post('/', autentication)
routes.get('/', loginController)
routes.get('/home', homeController)
routes.get('/showcase', showcaseController)
routes.get('/show-message', showMsgController)

export default routes