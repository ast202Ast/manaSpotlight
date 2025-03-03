import { db } from '../../database/db_configs.js'
import { getAllUsers } from '../../models/users_sql.js'

const showAllUsers = (req, res) => {
    try {
      db.all(getAllUsers, [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.json({ message: 'Tous les utilisateurs', data: rows })
      })
    } catch (error)  {
      return res.json({
        status: 400,
        success: false
      })
    }
  }

  export { showAllUsers }