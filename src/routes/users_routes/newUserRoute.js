import { db } from '../../database/db_configs.js'
import { createUser } from '../../models/users_sql.js'
import bcrypt from 'bcrypt'

    // creer un utilisateur
    const newUser = (req, res) => {
        try {
          const { prenom, nom, email, mot_de_passe, role } = req.body
  
          // Empeche l'insertion de champs vides
          if (!prenom || !nom || !email || !mot_de_passe || !role) {
            return res.status(400).json({ message: "Les champs sont vides" });
          }

          // Utilisation de bcrypt pour crypter un mot de passe
          bcrypt.hash(mot_de_passe, 8, (err, hash) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
  
            db.run(createUser, [prenom, nom, email, hash, role], (err) => {
              if (err) {
                  return res.status(500).json({ error: err.message })
              }
              res.json({ message: `Utilisateur ${nom} ${prenom} créé` })
            })
          })
        } catch (error) {
          return res.json({
            status: 400,
            success: false
          })
        }
      }
  
    export { newUser }