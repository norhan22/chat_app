const
  services = require('../services/messageServices'),
  mixins = require('../../../mixins'),
  methods = {
     send: async(req, res) => {
      const msg = req.body ;
      console.log('msg', msg)
      if (mixins.checkValidation(msg) === true) {
        await services.sendMessage(msg)
          console.log("services.sendMessage(msg)",services.sendMessage(msg))
        // console.log("res", res)
        res.send(msg)
        // res.io.emit('sendMessage',msg)
      }
      else res.status(400).send(mixins.checkValidation(msg))
    },
    getAll: (req, res) =>
    {
  res.send(services.getMessages())
    }
  }
module.exports = methods
