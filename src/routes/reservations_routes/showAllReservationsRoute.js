import { db } from '../../database/db_configs.js'
import { getAllReservations } from '../../models/reservations_sql.js'

const showAllReservations = (req, res) => {
    try {
      db.all(getAllReservations, [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.json({ message: 'Toutes les reservations', data: rows })
      })
    } catch (error)  {
      return res.json({
        status: 400,
        success: false
      })
    }
  }

  export { showAllReservations }