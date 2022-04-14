import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectToDatabase = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }as ConnectOptions)

  const db = mongoose.connection
  db.once('open', () => console.log('Conectado ao banco de dados.'))
  db.on('error', (error) => console.error(error))
}

export default connectToDatabase
