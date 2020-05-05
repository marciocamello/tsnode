import { Router } from 'express'

import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'

const routes = Router()

routes.post('/authenticate', AuthController.authenticate)
routes.get('/users', UserController.index)
routes.post('/users', UserController.store)

export default routes
