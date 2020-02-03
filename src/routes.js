const routes = require('express').Router()
const handler = require('express-async-handler')
const Validation = require('express-validation')

const authMiddleware = require('./app/middlewares/auth')

const validators = require('./app/validators')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')
const AdController = require('./app/controllers/AdController')
const PurchaseController = require('./app/controllers/PurchaseController')

routes.post(
  '/users',
  Validation(validators.User),
  handler(UserController.store)
)
routes.post(
  '/sessions',
  Validation(validators.Session),
  handler(SessionController.store)
)

routes.use(authMiddleware)

routes.get('/ads/', handler(AdController.index))
routes.get('/ads/:id', handler(AdController.show))
routes.post('/ads', Validation(validators.Ad), handler(AdController.store))
routes.put('/ads/:id', Validation(validators.Ad), handler(AdController.update))
routes.delete('/ads/:id', handler(AdController.destroy))

routes.post(
  '/purchases',
  Validation(validators.Purchase),
  handler(PurchaseController.store)
)

module.exports = routes
