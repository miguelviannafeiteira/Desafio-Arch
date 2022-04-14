import mongoose, { Document } from 'mongoose'

interface UserInterface extends Document {
  _id: Number,
  saldo: Number
}

const UserSchema = new mongoose.Schema({
  _id: Number,
  saldo: Number
})

export default mongoose.model<UserInterface>('Saldo', UserSchema)
