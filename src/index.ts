import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

const router = express.Router()

router.get('/', (req, res) => {
  res.send({ response: 'I am alive' }).status(200)
})

const app = express()
app.use(router)
const port = 8080

const http = createServer(app)
const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

let numActiveUsers = 0

io.on('connection', (socket: Socket) => {
  console.log('a user connected')
  numActiveUsers++
  io.emit('FromAPI', numActiveUsers)
  socket.on('disconnect', () => {
    console.log('a user disconnected')
    numActiveUsers--
  })

  socket.on('mouseClick', (data: unknown) => {
    console.log(data)
  })
})

http.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
