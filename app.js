import express from 'express'
import db from './src/database/database.js'
import projecteurRoutes from './src/routes/routes.js'
import spotlight from './src/models/spotlight.js'

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => res.send("Ici c'est l'acceuil"))

app.post('/users', projecteurRoutes.createUser)
app.get('/users', projecteurRoutes.getAllUsers)
app.get('/users/:id', projecteurRoutes.getUser)
app.delete('/users/:id', projecteurRoutes.deleteUser)

app.post('/spotlights', projecteurRoutes.createSpotlight)
app.get('/spotlights', projecteurRoutes.getAllSpotlights)
app.get('/spotlights/:id', projecteurRoutes.getSpotlight)
app.delete('/spotlights/:id', projecteurRoutes.deleteSpotlight)

app.post('/reservations', projecteurRoutes.newReservation)
app.get('/reservations', projecteurRoutes.getAllReservations)
app.delete('/reservations/:id', projecteurRoutes.deleteReservation)

app.listen(port, () => console.log(`L'application a demarre sur le port ${port}.`))