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
  chatRoomRoutes = require('./src/modules/Rooms/routes'),
  chatRoomServices = require('./src/modules/Rooms/services/contactsServices')

app.use(express.json())
app.use('/api/chat', chatRoomRoutes)

io.on('connection', (socket) => {
  socket.on('newUser', (user) => socket.broadcast.emit('newUser', user))
  socket.on('newMsg', (msg) => {
    chatRoomServices.getContact(msg.senderId).then((res) => {
      msg.senderName = res.name || ''
      socket.broadcast.emit('newMsg', msg)
    })


  })

})
app.use('/', express.static('./public_html'))

