const
  express = require('express'),
  app = express(),
  port = process.env.PORT,
  server = app.listen(port, () =>  console.log('Listening on port', port)),
  io = require('socket.io')(server, {
    cors: {
      origin:process.env.CORS_ALLOWED_ORIGIN,
      methods: ['GET', 'POST']
    }
  }),
  singleChatRoutes = require('./src/modules/singleChat/routes'),
  services = require('./src/modules/singleChat/services/contactsServices')

app.use(express.json())
app.use('/api/chat', singleChatRoutes)

io.on('connection', (socket) => {
  socket.on('newUser', (user) => socket.broadcast.emit('newUser', user))
  socket.on('newMsg', (msg) => {
    services.getContact(msg.senderId).then((res) => {
      console.log('res', res)
      msg.senderName = res.name || ''
      socket.broadcast.emit('newMsg', msg)
      console.log('msg', msg) 
    })

   
  })

})
app.use('/', express.static('./public_html'))

