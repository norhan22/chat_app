const messages = require('../models/messages'),
  methods = {
    sendMessage: (msg) => {
      msg.id = messages.length + 1 
      messages.push(msg)
      return messages
    },
    getMessages: () => {
      return messages
    }
  }
module.exports = methods