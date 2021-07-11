const services = require('../services/contactsServices'),
  methods = {
    getContacts: (req, res) => {
      res.send(services.getContacts())
    },
    getContact: (req, res) => {
      const contactId = req.body.params.id
      console.log('contactId', contactId)
      services.getContact(contactId).then(res =>  res.send(res))
    },
    addContact: (req, res) => {
      res.send(services.addContact(req.body))
    }
  }
module.exports = methods
