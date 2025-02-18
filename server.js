require('dotenv').config();
const express = require('express');
const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT);