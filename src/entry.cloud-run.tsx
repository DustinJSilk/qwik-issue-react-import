import { createServer } from 'node:http'
import { handler } from './entry.handler'

const server = createServer()

server.on('request', (req, res) => {
  handler(req, res)
})

const port = process.env.PORT ?? 8080
server.listen(port)
console.log('server started on port ', port)
