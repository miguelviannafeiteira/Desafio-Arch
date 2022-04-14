import { Request, Response } from 'express'
import api from '../lib/api'

class SaldoController {
  async indexUser (req:Request, res) {
    try {
      const usuario = await res.user
      return res.status(200).json({ usuario })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  // async store (req:Request, res:Response) => {
  //   const { id } = req.params
  //   try {
  //     const user = await User.find()
  //   } catch (err) {

  //   }
}

export default new SaldoController()
