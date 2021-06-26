
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
app.use((req, res, next) => {
  req.io = io
 
  next()
})
io.on('connection', (socket) => {
  socket.on('newUser', (user) => socket.broadcast.emit('newUser', user))
  socket.on('newMsg', (msg) => {
    const senderInfo = services.getContact(msg.senderId)
    msg.senderName = senderInfo.name
    socket.broadcast.emit('newMsg', msg)
  })

})
app.use('/', express.static('./public_html'))

