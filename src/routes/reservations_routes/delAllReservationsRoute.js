import { db } from '../../database/db_configs.js'
import { deleteAllReservations } from '../../models/reservations_sql.js'

const delAllReservations = (req, res) => {
    try {
      db.run(deleteAllReservations, [], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
    

      db.run('UPDATE spotlights SET spotlight_available = ?', ['disponible'], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }

        return res.json({ message: 'Toutes les reservations sont supprimees et les projecteurs sont a nouveau disponibles' })
      })

    })
    } catch (error)  {
      return res.json({
      status: 400,
      success: falsejj
      })
    }
}

export { delAllReservations }