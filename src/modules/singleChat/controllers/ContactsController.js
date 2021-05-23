const services = require('../services/contactsServices'),
  methods = {
    getContacts: (req, res) => {
      res.send(services.getContacts())
    }
  }
module.exports = methods
