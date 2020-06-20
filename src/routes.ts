import { Router } from 'express'

import JwtMiddleware from '@middlewares/JwtMiddleware'
import HomeController from '@controllers/HomeController'
import AuthController from '@controllers/AuthController'
import UserController from '@controllers/UserController'

const routes = Router()

routes.get('/', HomeController.index)

routes.post('/register', AuthController.register)
routes.post('/login', AuthController.authenticate)

routes.get('/users', JwtMiddleware, UserController.index)
routes.post('/users', JwtMiddleware, UserController.store)
routes.put('/users/:id', JwtMiddleware, UserController.update)
routes.delete('/users/:id', JwtMiddleware, UserController.delete)

export default routes
