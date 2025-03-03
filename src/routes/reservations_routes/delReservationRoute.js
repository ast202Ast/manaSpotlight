import { db } from '../../database/db_configs.js'
import { getReservation, deleteReservation } from '../../models/reservations_sql.js'
import { updateSpotlightAvailable } from '../../models/spotlights_sql.js'

const delReservation = (req, res) => {
  try {
    const { id } = req.params

    db.get(getReservation, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      console.log(row)
      if (!row) {
        return res.json({ status: 400, success: false, message: 'Reservation inexistante' })
      }

      db.run(updateSpotlightAvailable, ['disponible', row.spotlight_id], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }

        console.log(`${row.spotlight_id} est disponible`)

        db.run(deleteReservation, [id], (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          }

          res.json({ message: `La reservation ${id} n'existe plus` })
        })
      })
    })
  } catch (error)  {
    return res.json({
    status: 400,
    success: false
    })
  }
}

export { delReservation }