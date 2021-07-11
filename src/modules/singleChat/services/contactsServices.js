const data = require('../models/Contacts'),
  services = {
    
    getContacts:() => {
      return data
    },
    getContact: (id) => {
      return new Promise((resolve, reject) => {
        const matched = data.find(e => e.id === id)
        if (matched.id) resolve(matched)
        else reject('there is no contact with with id')
       
      })
    },
    addContact: (newContact) => {
      newContact.id = data.length + 1
      data.push(newContact)
      return newContact
    }
  }
module.exports = services