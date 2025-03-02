import express from 'express'
import dotenv from 'dotenv'
import { usersRoutes } from './src/routes/usersRoutes.js'
import { spotlightsRoutes } from './src/routes/spotlightsRoutes.js'
import { reservationsRoutes } from './src/routes/reservationsRoutes.js'

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => res.send("WELCOME"))

// Utilisateurs
app.post('/register', usersRoutes.newUser)
app.post('/login', usersRoutes.loginUser)
app.get('/users', usersRoutes.showAllUsers)
app.get('/users/:id_utilisateur', usersRoutes.showUser)
app.put('/users', usersRoutes.updUser)
app.delete('/users', authMiddleware,usersRoutes.delAllUsers)
app.delete('/users/:id_utilisateur', authMiddleware,usersRoutes.delUser)
app.get('/profile', authMiddleware, usersRoutes.getProfile)

// Projecteurs
app.post('/projectors', spotlightsRoutes.newSpotlight)
app.get('/projectors', spotlightsRoutes.showAllSpotlights)
app.get('/projectors/:id_projecteur', spotlightsRoutes.showSpotlight)
app.put('/projectors', spotlightsRoutes.updSpotlight)
app.delete('/projectors', authMiddleware,spotlightsRoutes.delAllSpotlights)
app.delete('/projectors/:id_projecteur', authMiddleware, spotlightsRoutes.delSpotlight)

// Reservations
app.post('/reservations', reservationsRoutes.newReservation)
app.get('/reservations', reservationsRoutes.showAllReservations)
app.get('/reservations/:id_reservation', reservationsRoutes.showReservation)
app.put('/reservations', reservationsRoutes.updReservation)
app.delete('/reservations', authMiddleware, reservationsRoutes.delAllReservations)
app.delete('/reservations/:id_reservation', authMiddleware,reservationsRoutes.delReservation)

app.listen(port, () => console.log(`L'application a demarre sur le port ${port}.`))
