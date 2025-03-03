import { db } from '../../database/db_configs.js'
import { getUser } from '../../models/users_sql.js'

const showUser = (req, res) => {
    try {
      const { id_utilisateur } = req.params

      db.get(getUser, [id_utilisateur], (err, row) => {
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

export { showUser }