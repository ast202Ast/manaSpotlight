import spotlight from "../models/spotlight.js"

const projecteurRoutes = {
    createUser: (req, res) => {
        const { nom, prenom, email, mot_de_passe, role } = req.body
        spotlight.createUser(nom, prenom, email, mot_de_passe, role, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.json({ message: 'Utilisateur cree' })
        })
    },

    getAllUsers: (req, res) => {
      spotlight.getAllUsers((err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.json(rows)
      })
    },

    getUser: (req, res) => {
        const { id_utilisateur } = req.params
        spotlight.getUser(id_utilisateur, (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.json(row)
        })
    },

    deleteUser: (req, res) => {
        const { id_utilisateur } = req.params
        spotlight.deleteUser(id_utilisateur, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.json({ message: 'Utilisateur supprime' })
        })
    },

    createSpotlight: (req, res) => {
        const { nom_projecteur, etat_projecteur } = req.body
        spotlight.createSpotlight(nom_projecteur, etat_projecteur, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.json({ message: 'Projecteur cree' })
        })
    },

    getAllSpotlights: (req, res) => {
        spotlight.getAllSpotlights((err, rows) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          }
          res.json(rows)
        })
    },

    getSpotlight: (req, res) => {
        const { id_projecteur } = req.params
        spotlight.getUser(id_projecteur, (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.json(row)
        })
    },

    deleteSpotlight: (req, res) => {
        const { id_projecteur } = req.params
        spotlight.deleteUser(id_projecteur, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.json({ message: 'Projecteur supprime' })
        })
    },

    newReservation: (req, res) => {
        const { id_utilisateur, id_projecteur, date_debut, date_fin } = req.body
        spotlight.newReservation(id_utilisateur, id_projecteur, date_debut, date_fin, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.json({ message: 'Reservation faite' })
        })
    },

    getAllReservations: (req, res) => {
        spotlight.getAllReservations((err, rows) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          }
          res.json(rows)
        })
    },

    deleteReservation: (req, res) => {
        const { id_reservation } = req.params
        spotlight.deleteReservation(id_reservation, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res.json({ message: 'Reservation supprimee' })
        })
    }
}

export default projecteurRoutes