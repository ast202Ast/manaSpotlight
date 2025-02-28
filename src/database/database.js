import sqlite3 from 'sqlite3'

const sqlite = sqlite3.verbose()
const db = new sqlite.Database('./src/database/spotlight.sqlite', (err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données SQLite', err.message)
    } else {
        console.log('Connecté à la base de donnees SQLite')
    }
})

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS utilisateurs (
        id_utilisateur INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        mot_de_passe TEXT NOT NULL,
        role TEXT CHECK(role IN ('etudiant', 'enseignant', 'admin')) NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS projecteurs (
        id_projecteur INTEGER PRIMARY KEY AUTOINCREMENT,
        nom_projecteur TEXT NOT NULL,
        etat_projecteur TEXT CHECK(etat_projecteur IN ('fonctionnel', 'non fonctionnel')) NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS reservations (
        id_reservations INTEGER PRIMARY KEY AUTOINCREMENT,
        id_utilisateur INTEGER NOT NULL,
        id_projecteur INTEGER NOT NULL,
        date_debut TEXT NOT NULL,
        date_fin TEXT NOT NULL,
        FOREIGN KEY(id_utilisateur) REFERENCES utilisateurs(id_utilisateur),
        FOREIGN KEY(id_projecteur) REFERENCES projecteurs(id_projecteur)
    )`)
})

export default db

// const insertion = "INSERT INTO users(name, email, age) VALUES (?, ?, ?)";