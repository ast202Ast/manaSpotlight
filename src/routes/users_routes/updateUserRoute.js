import { db } from '../../database/db_configs.js'
import { updateUser } from '../../models/users_sql.js'

const updUser = (req, res) => {
    try {
        const { id_utilisateur, prenom, nom, email, mot_de_passe, role } = req.body

        // Empeche l'insertion de champs vides
        if (!id_utilisateur || !prenom || !nom || !email || !mot_de_passe || !role) {
            return res.status(400).json({ message: "Les champs sont vides" });
          }
        // Modification des informations d'un utilisateur
        db.run(updateUser, [prenom, nom, email, mot_de_passe, role, id_utilisateur], (err, row) => {
        if (err) {
        return res.status(500).json({ error: err.message })
        }
        res.json({ message: `Les modifications ont ete prises en compte` })
    })
    } catch (error)  {
        return res.json({
        status: 400,
        success: false
        })
    }
}

export { updUser }