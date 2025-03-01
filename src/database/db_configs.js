import sqlite3 from 'sqlite3'

//  Connexion a SQLite

const sqlite = sqlite3.verbose()
const db = new sqlite.Database('../../spotlight.sqlite', (err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données', err.message)
    } else {
        console.log('Connecté à la base de donnees')
    }
})

// Creation des tables de la base de donnees

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_firstname TEXT NOT NULL,
        user_lastname TEXT NOT NULL,
        user_email TEXT UNIQUE NOT NULL,
        user_password TEXT NOT NULL,
        user_role TEXT CHECK(user_role IN ('étudiant', 'enseignant', 'admin')) NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS spotlights (
        spotlight_id INTEGER PRIMARY KEY AUTOINCREMENT,
        spotlight_name TEXT NOT NULL,
        spotlight_state TEXT CHECK(spotlight_state IN ('fonctionnel', 'non fonctionnel')) NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS reservations (
        reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        spotlight_id INTEGER NOT NULL,
        date_start TEXT NOT NULL,
        date_end TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES utilisateurs(user_id),
        FOREIGN KEY(spotlight_id) REFERENCES projecteurs(spotlight_id)
    )`)
})

export { db }