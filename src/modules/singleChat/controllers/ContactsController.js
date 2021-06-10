const services = require('../services/contactsServices'),
  methods = {
    getContacts: (req, res) => {
      res.send(services.getContacts())
    },
    addContact: (req, res) => {
      res.send(services.addContact(req.body))
    }
  }
module.exports = methods
