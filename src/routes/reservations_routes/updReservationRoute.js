import { db } from '../../database/db_configs.js'
import { updateReservation } from '../../models/reservations_sql.js'

const updReservation =  (req, res) => {
    try {
        const { id_reservation, id_utilisateur, id_projecteur, date_debut, date_fin } = req.body

        // Empeche l'insertion de champs vides
        if (!id_reservation || !id_utilisateur || !id_projecteur || !date_debut || !date_fin) {
            return res.status(400).json({ message: "Champs vides" });
          }

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
}

export { updReservation }