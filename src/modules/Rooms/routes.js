const
  express = require('express'),
  routes = express.Router(),
  controllers = require('./controllers')


routes.get('/contacts', controllers.ContactsController.getContacts)
routes.post('/addContact', controllers.ContactsController.addContact)
routes.get('/contact/:id', controllers.ContactsController.getContact)
routes.post('/send-message', controllers.MessageController.send)
routes.get('/messages', controllers.MessageController.getAll)

module.exports = routes