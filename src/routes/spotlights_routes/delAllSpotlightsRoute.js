import { db } from '../../database/db_configs.js'
import { deleteAllSpotlights } from '../../models/spotlights_sql.js'

const delAllSpotlights = (req, res) => {
    try {
      db.run(deleteAllSpotlights, [], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.json({ message: `Tous les projecteurs ont ete supprimes` })
    })
    } catch (error)  {
      return res.json({
      status: 400,
      success: false
      })
    }
}

export { delAllSpotlights }