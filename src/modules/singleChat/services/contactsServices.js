const data = require('../models/Contacts'),
  services = {
    
    getContacts:() => {
      return data
    },
    addContact: (newContact) => {
      newContact.id = data.length + 1
      data.push(newContact)
    }
  }
module.exports = services