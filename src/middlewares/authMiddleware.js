import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// middleware d'authentification

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Accès refusé, token manquant." })
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, verify) => {
        if (err) {
            return res.status(403).json({ message: "Token invalide." })
        }

        req.user = verify
        next()
    })
}

// middleware de gestion des roles

const roleMiddleware = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès interdit, vous ne disposez pas des droits necessaires." })
        }
        next()
    }
}

export { authMiddleware, roleMiddleware }