import { db } from '../../database/db_configs.js'
import { deleteUser } from '../../models/users_sql.js'

const delUser = (req, res) => {
    try {
      const { id_utilisateur } = req.params

      db.run(deleteUser, [id_utilisateur], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      res.json({ message: `Le compte avec l' ID ${id_utilisateur} n'existe plus` })
    })
    } catch (error)  {
      return res.json({
      status: 400,
      success: false
      })
    }
  }

  export { delUser }