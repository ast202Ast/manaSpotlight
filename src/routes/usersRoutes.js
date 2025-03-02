import { db } from '../database/db_configs.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { createUser, getUser, getUserByEmail, getAllUsers, updateUser, deleteUser, deleteAllUsers } from '../models/users_sql.js'

dotenv.config()

const jwtSign = process.env.SECRET_KEY

const usersRoutes = {
    // creer un utilisateur
    newUser: (req, res) => {
      try {
        const { prenom, nom, email, mot_de_passe, role } = req.body

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
    },

    // connexion a un compte
    loginUser: (req, res) => {
      try {
        const { email, mot_de_passe } = req.body;

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

          bcrypt.compare(mot_de_passe, row.user_password, (err, result) => {
            if (err) {
              return res.status(500).json({ error: err.message })
            }
            if (!result) {
              return res.status(400).json({ error: 'Mot de passe incorrect' })
            }

            const token = jwt.sign({ 
              id_utilisateur: row.user_id, email: row.user_email, role: row.user_role },
              jwtSign, 
              { expiresIn: '2h' })
            res.json({ token, message: 'Connexion reussie' })
          })
        })
      } catch (error) {
        return res.status(400).json({
          status: 400,
          success: false
        });
      }
    },

    // afficher un utilisateur
    showUser: (req, res) => {
        try {
          const { id_utilisateur } = req.params
          db.get(getUser, [id_utilisateur], (err, row) => {
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

    // showEmailUser: (req, res) => {
    //   try {
    //     const { email } = req.params
    //     db.get(getUserByEmail, [email], (err, row) => {
    //     if (err) {
    //       return res.json({ status: 500, success: false, error: err.message })
    //     }
    //     res.json({ status: 200, success: true, data: row})
    //     })
    //   } catch (error)  {
    //     return res.json({
    //     status: 400,
    //     success: false
    //     })
    //   }
    // },

    //afficher tous les utilisateurs
    showAllUsers: (req, res) => {
      try {
        db.all(getAllUsers, [], (err, rows) => {
          if (err) {
            return res.status(500).json({ error: err.message })
          }
          res.json({ message: 'Tous les users', data: rows })
        })
      } catch (error)  {
        return res.json({
          status: 400,
          success: false
        })
      }
    },

    // mettre a jour un utilisatueur
    updUser: (req, res) => {
        try {
            const { id_utilisateur, prenom, nom, email, mot_de_passe, role } = req.body
            db.run(updateUser, [prenom, nom, email, mot_de_passe, role, id_utilisateur], (err, row) => {
            if (err) {
            return res.status(500).json({ error: err.message })
            }
            res.json({ message: `Prenom ${prenom} modifie avec ${prenom}` })
        })
        } catch (error)  {
            return res.json({
            status: 400,
            success: false
            })
        }
    },

    // supprimer un utilisateur
    delUser: (req, res) => {
      try {
        const { id_utilisateur } = req.params
        db.run(deleteUser, [id_utilisateur], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        res.json({ message: `${id_utilisateur} n'existe plus` })
      })
      } catch (error)  {
        return res.json({
        status: 400,
        success: false
        })
      }
    },

    // supprimer tous les utilisateurs
    delAllUsers: (req, res) => {
        try {
          db.run(deleteAllUsers, [], (err) => {
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
    },

    // route protegee
    getProfile: (req, res) => {
      res.json({ user: req.user })
    }
}

export { usersRoutes }
