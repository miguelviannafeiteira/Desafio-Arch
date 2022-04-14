import express from 'express'
import routes from './routes'
import connectToDatabase from './database'

connectToDatabase()

const port = 3334
const app = express()

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`Backend foi iniciado em http://localhost:${port}`)
})
