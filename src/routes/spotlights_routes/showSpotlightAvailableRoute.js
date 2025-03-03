import { db } from '../../database/db_configs.js'
import { getSpotlightAvailable } from '../../models/spotlights_sql.js'

const showSpotlightAvailable = (req, res) => {
    try {
      db.all(getSpotlightAvailable, ['disponible'], (err, rows) => {
      if (err) {
        return res.json({ status: 500, success: false, error: err.message })
      }
      res.json({ status: 200, success: true, message: 'Liste des projecteurs disponibles', data: rows})
      })
    } catch (error)  {
      return res.json({
      status: 400,
      success: false
      })
    }
  }

  export { showSpotlightAvailable }