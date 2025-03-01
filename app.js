import express from 'express'
import dotenv from 'dotenv'

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => res.send("WELCOME"))


app.listen(port, () => console.log(`L'application a demarre sur le port ${port}.`))