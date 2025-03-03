import { db } from '../../database/db_configs.js'
import { createSpotlight } from '../../models/spotlights_sql.js'

const newSpotlight = (req, res) => {
    try {
      const { nom_projecteur, etat, disponibilite } = req.body

      // Empeche l'insertion de champs vides
      if (!nom_projecteur || !etat || !disponibilite) {
        return res.status(400).json({ message: "Champs vides" });
      }

      db.run(createSpotlight, [nom_projecteur, etat, disponibilite], (err) => {
          if (err) {
              return res.status(500).json({ error: err.message })
          }
          res.json({ message: `Projecteur ${nom_projecteur} insere dans la base de donnees` })
      })
    } catch (error) {
      return res.json({
        status: 400,
        success: false
      })
    }
  }

  export { newSpotlight }