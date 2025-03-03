import { db } from '../../database/db_configs.js'
import { getReservation } from '../../models/reservations_sql.js'

const showReservation = (req, res) => {
    try {
      const { id_reservation } = req.params

      db.get(getReservation, [id_reservation], (err, row) => {
      if (err) {
        return res.json({ status: 500, success: false, error: err.message })
      }
      res.json({ status: 200, success: true, data: row})
      })
    } catch (error)  {
      return res.json({
      status: 400,
      success: false
      })
    }
  }

export { showReservation }