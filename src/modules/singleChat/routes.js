const
  express = require('express'),
  routes = express.Router(),
  controllers = require('./controllers/index')
  
    
routes.get('/contacts', controllers.ContactsController.getContacts)
routes.post('/send-message', controllers.MessageController.send)
routes.get('/messages', controllers.MessageController.getAll)

module.exports = routes