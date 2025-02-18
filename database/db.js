const sqlite3 = require('sqlite3').verbose();

// Connexion à la base SQLite
const db = new sqlite3.Database('./database/spotlightmana.db');

// Création des tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS utilisateurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        mot_de_passe TEXT NOT NULL,
        role TEXT CHECK(role IN ('etudiant', 'enseignant', 'admin')) NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS projecteurs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        marque_modele TEXT NOT NULL,
        etat TEXT CHECK(etat IN ('fonctionnel', 'non fonctionnel')),
        disponible TEXT CHECK(disponible IN ('OUI', 'NON')),
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        utilisateur_id INTEGER NOT NULL,
        projecteur_id INTEGER NOT NULL,
        date_reservation TEXT NOT NULL,
        heure_debut TEXT NOT NULL,
        heure_fin TEXT NOT NULL,
        FOREIGN KEY(utilisateur_id) REFERENCES utilisateurs(id),
        FOREIGN KEY(projecteur_id) REFERENCES projecteurs(id)
    )`);
});

module.exports = db;
