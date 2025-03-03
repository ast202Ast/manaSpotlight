import { db } from '../../database/db_configs.js'
import { getAllSpotlights } from '../../models/spotlights_sql.js'

const showAllSpotlights = (req, res) => {
    try {
      db.all(getAllSpotlights, [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.json({ message: 'Tous les projecteus', data: rows })
      })
    } catch (error)  {
      return res.json({
        status: 400,
        success: false
      })
    }
  }

  export { showAllSpotlights }