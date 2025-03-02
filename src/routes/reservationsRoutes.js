import { db } from '../database/db_configs.js'
import { createReservation, getReservation, getAllReservations, updateReservation, deleteReservation, deleteAllReservations } from '../models/reservations_sql.js'

const reservationsRoutes = {
    // Nouvelle reservation
    newReservation: (req, res) => {
      try {
        const { id_utilisateur, id_projecteur, date_debut, date_fin } = req.body
        db.run(createReservation, [id_utilisateur, id_projecteur, date_debut, date_fin], (err) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.json({ message: `Nouvelle reservation de ${id_projecteur} debut ${date_debut} et fin ${date_fin}` })
        })
      } catch (error) {
        return res.json({
          status: 400,
          success: false
        })
      }
    },

    // afficher une reservation
    showReservation: (req, res) => {
        try {
          const { id_reservation } = req.params
          db.get(getReservation, [id_reservation], (err, row) => {
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

      // afficher toutes les reservations
      showAllReservations: (req, res) => {
      try {
        db.all(getAllReservations, [], (err, rows) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          }
          res.json({ message: 'Toutes les reservations', data: rows })
        })
      } catch (error)  {
        return res.json({
          status: 400,
          success: false
        })
      }
    },

    // mettre a jour une reservation
    updReservation: (req, res) => {
        try {
            const { id_reservation, id_utilisateur, id_projecteur, date_debut, date_fin } = req.body
            db.run(updateReservation, [id_utilisateur, id_projecteur, date_debut, date_fin, id_reservation], (err, row) => {
            if (err) {
            return res.status(500).json({ error: err.message })
            }
            res.json({ message: `Reservation modifiee avec ${id_utilisateur}, ${id_projecteur}, ${date_debut} et ${date_fin}` })
        })
        } catch (error)  {
            return res.json({
            status: 400,
            success: false
            })
        }
    },

    //supprimer une reservation
    delReservation: (req, res) => {
      try {
        const { id_reservation } = req.params
        db.run(deleteReservation, [id_reservation], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.json({ message: `${id_reservation} n'existe plus` })
      })
      } catch (error)  {
        return res.json({
        status: 400,
        success: false
        })
      }
    },

    // supprimer toutes les reservations
    delAllReservations: (req, res) => {
        try {
          db.run(deleteAllReservations, [], (err) => {
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

export { reservationsRoutes }
