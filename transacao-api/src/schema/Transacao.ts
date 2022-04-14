import mongoose, { Document } from 'mongoose'

interface TransacaoInterface extends Document {
  usuarioId: number,
  valor: number,
  debito?:boolean,
  credito?:boolean
}

const TransacaoSchema = new mongoose.Schema({
  usuarioId: {
    type: Number,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  debito: {
    type: Boolean,
    default: false
  },
  credito: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: true, 
    updatedAt: false
  }
})

export default mongoose.model<TransacaoInterface>('Transacao', TransacaoSchema)
