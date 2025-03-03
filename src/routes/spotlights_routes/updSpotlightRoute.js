import { db } from '../../database/db_configs.js'
import { updateSpotlight } from '../../models/spotlights_sql.js'

const updSpotlight = (req, res) => {
    try {
        const { id_projecteur, etat, disponibilite } = req.body

        // Empeche l'insertion de champs vides
        if (!id_projecteur || !etat || !disponibilite) {
            return res.status(400).json({ message: "Champs vides" });
        }

        db.run(updateSpotlight, [etat, disponibilite, id_projecteur], (err) => {
        if (err) {
        return res.status(500).json({ error: err.message })
        }
        res.json({ message: `Projecteur modifie avec "${etat}" et "${disponibilite}"` })
    })
    } catch (error)  {
        return res.json({
        status: 400,
        success: false
        })
    }
}

export { updSpotlight }