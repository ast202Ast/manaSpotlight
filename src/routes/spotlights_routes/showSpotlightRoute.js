import { db } from '../../database/db_configs.js'
import { getSpotlight } from '../../models/spotlights_sql.js'

const showSpotlight = (req, res) => {
    try {
      const { id_projecteur } = req.params
      
      db.get(getSpotlight, [id_projecteur], (err, row) => {
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

  export { showSpotlight }