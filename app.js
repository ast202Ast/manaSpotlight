import express from 'express'
import { users } from './src/routes/users.js'
import { spotlights } from './src/routes/spotlights.js'
import { reservations } from './src/routes/reservations.js'
import { authMiddleware, roleMiddleware } from './src/middlewares/authMiddleware.js'

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => res.send("BIENVENU"))

// Endpoints pour les utilisateurs
app.post('/register', users.newUser)
app.post('/login', users.loginUser)
app.get('/profile', authMiddleware, users.getProfile)
app.get('/users', authMiddleware, users.showAllUsers)
app.get('/users/:id_utilisateur', authMiddleware, users.showUser)
app.put('/users', authMiddleware, users.updUser)
app.delete('/users', authMiddleware, roleMiddleware(['admin']), users.delAllUsers)
app.delete('/users/:id_utilisateur', authMiddleware, roleMiddleware(['admin']), users.delUser)

// app.delete('/users/:id_utilisateur', authMiddleware, roleMiddleware(['admin']), users.delUser)

// Endpoints pour les projecteurs
app.post('/projectors', spotlights.newSpotlight)
app.get('/projectors/all_projectors', authMiddleware, spotlights.showAllSpotlights)
app.get('/projectors/:id_projecteur', authMiddleware, spotlights.showSpotlight)
app.get('/projectors/', authMiddleware, spotlights.showSpotlightAvailable)
app.put('/projectors', authMiddleware, spotlights.updSpotlight)
app.delete('/projectors', authMiddleware, roleMiddleware(['admin']), spotlights.delAllSpotlights)
app.delete('/projectors/:id', authMiddleware, roleMiddleware(['admin']), spotlights.delSpotlight)

// Endpoints pour les reservations
app.post('/reservations', reservations.newReservation)
app.get('/reservations', authMiddleware, reservations.showAllReservations)
app.get('/reservations/:id_reservation', authMiddleware, reservations.showReservation)
app.put('/reservations', authMiddleware, reservations.updReservation)
app.delete('/reservations', authMiddleware, roleMiddleware(['admin']), reservations.delAllReservations)
app.delete('/reservations/:id', authMiddleware, roleMiddleware(['admin']), reservations.delReservation)

app.listen(port, () => console.log(`L'application a demarre sur le port ${port}.`))
