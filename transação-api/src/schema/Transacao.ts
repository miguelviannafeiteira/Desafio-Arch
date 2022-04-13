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
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model<TransacaoInterface>('Transacao', TransacaoSchema)
