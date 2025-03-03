import { db } from '../../database/db_configs.js'
import { deleteSpotlight } from '../../models/spotlights_sql.js'

const delSpotlight = (req, res) => {
    try {
      const { id } = req.params

      db.run(deleteSpotlight, [id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.json({ message: `${id} n'existe plus` })
    })
    } catch (error)  {
      return res.json({
      status: 400,
      success: false
      })
    }
  }

  export { delSpotlight }