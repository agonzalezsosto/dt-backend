import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import GeneticAlgorithm from './genetic-algorithm'
import TrigTimekeeper from './trig-timekeeper'

const router = express.Router()
const textGeneticAlgorithm = GeneticAlgorithm()
const trigTimekeeper = TrigTimekeeper()
let fittest = ''

setInterval(() => {
  textGeneticAlgorithm.calculateNewGeneration()
  trigTimekeeper.step()
}, 10)

setInterval(() => {
  trigTimekeeper.addOffsetOne()
}, 100000)

setInterval(() => {
  trigTimekeeper.addOffsetTwo()
}, 500000)

setInterval(() => {
  trigTimekeeper.addOffsetThree()
}, 1000000)

router.get('/', (req, res) => {
  res.send({ response: 'I am alive' }).status(200)
})

const app = express()
app.use(router)
const port = process.env.PORT || 8080

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
    io.emit('geneticAlgorithmText', textGeneticAlgorithm.getFittest())
    io.emit('trigTimekeeper', trigTimekeeper.getValues())
  }, 10)

  io.emit('numberOfParticipants', numActiveUsers)

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
