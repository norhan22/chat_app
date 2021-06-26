const data = require('../models/Contacts'),
  services = {
    
    getContacts:() => {
      return data
    },
    getContact: (id) => {
     
      return data.find(e => e.id === id)
    },
    addContact: (newContact) => {
      newContact.id = data.length + 1
      data.push(newContact)
      return newContact
    }
  }
module.exports = services