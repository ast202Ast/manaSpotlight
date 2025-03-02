import { db } from '../database/db_configs.js'
import { createSpotlight, getSpotlight, getAllSpotlights, updateSpotlight, deleteSpotlight, deleteAllSpotlights } from '../models/spotlights_sql.js'

const spotlightsRoutes = {
    // nouveau projecteur
    newSpotlight: (req, res) => {
      try {
        const { nom_projecteur, etat } = req.body
        db.run(createSpotlight, [nom_projecteur, etat], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.json({ message: `Projecteur ${nom_projecteur} insere avec letat  ${etat} créé` })
        })
      } catch (error) {
        return res.json({
          status: 400,
          success: false
        })
      }
    },

    // afficher un projecteur
    showSpotlight: (req, res) => {
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
      },

      // afficher tous les projecteurs
      showAllSpotlights: (req, res) => {
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
    },

    // mettre a jour un projecteur
    updSpotlight: (req, res) => {
        try {
            const { nom_projecteur, etat, id_projecteur } = req.body
            db.run(updateSpotlight, [nom_projecteur, etat, id_projecteur], (err, row) => {
            if (err) {
            return res.status(500).json({ error: err.message })
            }
            res.json({ message: `Projecteur modifie avec ${nom_projecteur} et ${etat}` })
        })
        } catch (error)  {
            return res.json({
            status: 400,
            success: false
            })
        }
    },

    // supprimer un projecteur
    delSpotlight: (req, res) => {
      try {
        const { id_projecteur } = req.params
        db.run(deleteSpotlight, [id_projecteur], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.json({ message: `${id_projecteur} n'existe plus` })
      })
      } catch (error)  {
        return res.json({
        status: 400,
        success: false
        })
      }
    },

    // supprimer tous les projecteurs
    delAllSpotlights: (req, res) => {
        try {
          db.run(deleteAllSpotlights, [], (err) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          }
          res.json({ message: `Tout a ete supprime` })
        })
        } catch (error)  {
          return res.json({
          status: 400,
          success: false
          })
        }
    }
}

export { spotlightsRoutes }
