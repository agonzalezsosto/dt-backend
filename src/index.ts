import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import GeneticAlgorithm from './genetic-algorithm'

const router = express.Router()
const a = GeneticAlgorithm()
let fittest = ''

setInterval(() => {
  a.calculateNewGeneration()
}, 10)

router.get('/', (req, res) => {
  res.send({ response: 'I am alive' }).status(200)
})

const app = express()
app.use(router)
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Credentials', 'true')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
//   )
//   next()
// })
const port = 8080

const http = createServer(app)
const io = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

let numActiveUsers = 0

io.on('connection', (socket: Socket) => {
  console.log('a user connected')
  numActiveUsers++
  setInterval(() => {
    io.emit('FromAPI', a.getFittest())
  }, 10)

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
