import { db } from '../../database/db_configs.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { getUserByEmail } from '../../models/users_sql.js'

dotenv.config()

const jwtAccess = process.env.SECRET_KEY

if(!jwtAccess) {
  console.error('SECRET non definie dans le fichier .env')
  process.exit(1)
}

const loginUser = (req, res) => {
    try {
      const { email, mot_de_passe } = req.body;

      // Empeche l'insertion de champs vides
      if (!email || !mot_de_passe) {
        return res.status(400).json({ error: 'Email et mot de passe requis' });
      }

      db.get(getUserByEmail, [email], (err, row) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        if (!row) {
          return res.status(400).json({ error: 'Utilisateur non trouvé' })
        }
        
        // Comparaison entre le mot de passe fourni a la connexion et a celui identifie dans la base de donnees
        bcrypt.compare(mot_de_passe, row.user_password, (err, verify) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          }
          if (!verify) {
            return res.status(400).json({ error: 'Mot de passe incorrect' })
          }

          const token = jwt.sign({ 
            email: row.user_email, role: row.user_role },
            jwtAccess, 
            { expiresIn: '2h' })

            console.log(token)
          res.json({ token, message: 'Connexion reussie a votre compte' })
        })
      })
    } catch (error) {
      return res.status(400).json({ status: 400, success: false })
    }
  }

  export { loginUser }