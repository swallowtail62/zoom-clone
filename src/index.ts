import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { v4 as uuidV4 } from 'uuid'

const app = express()
const server = new http.Server(app)
const io = new Server(server, { serveClient: true }) // https://socket.io/docs/v4/server-initialization/#serveClient

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', (socket) => {
  // handles the event sent with socket.emit()
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId)
    })
  })
})

const port = Number(process.env.PORT) || 7000
server.listen(port)
