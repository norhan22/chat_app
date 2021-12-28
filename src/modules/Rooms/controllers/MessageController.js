const
  services = require('../services/messageServices'),
  mixins = require('../../../mixins'),
  methods = {
    send: (req, res) => {
      const msg = req.body 
      // console.log('msg', msg)
      if (mixins.checkValidation(msg) === true) {
        services.sendMessage(msg)
        // console.log("res", res)
        res.send(msg)
        // res.io.emit('sendMessage',msg)
      } else res.status(400).send(mixins.checkValidation(msg))
    },
    getAll: (req, res) => {
      // console.log('messages', services.getMessages())
      res.send(services.getMessages())

    }
  }
module.exports = methods
