
const
  express = require('express'),
  singleChatRoutes = require('./src/modules/singleChat/routes'),
  app = express(),
  port = process.env.PORT,
  server = app.listen(port, () =>  console.log('Listening on port', port)),
  io = require('socket.io')(server)

app.use(express.json())
app.use('/api/chat', singleChatRoutes)
io.on('connection', (socket) => {
  console.log('socket Connected id:', socket.id)
})
app.use('/', express.static('./public_html'))
app.use((req, res, next) => {
  res.io = io
  next()
})