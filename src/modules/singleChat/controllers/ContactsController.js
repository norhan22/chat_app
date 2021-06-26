const services = require('../services/contactsServices'),
  methods = {
    getContacts: (req, res) => {
      res.send(services.getContacts())
    },
    getContact: (req, res) => {
      const contactId = req.body.params.id
      console.log('contactId', contactId)
      res.send(services.getContact(contactId))
    },
    addContact: (req, res) => {
      res.send(services.addContact(req.body))
    }
  }
module.exports = methods
