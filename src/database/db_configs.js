import sqlite3 from 'sqlite3'

// Connexion à SQLite
const sqlite = sqlite3.verbose()
const db = new sqlite.Database('spotlight.sqlite', (err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données', err.message)
    } else {
        console.log('Connecté à la base de donnees')
    }
})

// Création des tables de la base de données
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
        spotlight_state TEXT CHECK(spotlight_state IN ('fonctionnel', 'non fonctionnel')) NOT NULL,
        spotlight_available TEXT CHECK(spotlight_available IN ('disponible', 'non disponible')) NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS reservations (
        reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        spotlight_id INTEGER NOT NULL,
        date_start TEXT NOT NULL,
        date_end TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(user_id),
        FOREIGN KEY(spotlight_id) REFERENCES spotlights(spotlight_id)
    )`)

    // // Donnees utilisteurs
    //     ('Alice', 'Dupont', 'alice.dupont@gmail.com', 'password123', 'admin'),
    //     ('Bob', 'Martin', 'bob.martin@gmail.com', 'pwdd567', 'admin'),
    //     ('Charlie', 'Durand', 'charlie.durand@yahoo.com', 'fgh7899', 'enseignant'),
    //     ('David', 'Lemoine', 'david.lemoine@gmail.com', 'essaie90', 'étudiant'),
    //     ('Emma', 'Petit', 'emma.petit@yahoo.com', 'jklm899', 'étudiant'),
    //     ('Fabien', 'Moreau', 'fabien.moreau@gmail.com', '23qwerty', 'enseignant'),
    //     ('Gérard', 'Roux', 'gerard.roux@gmail.com', 'user4536', 'étudiant'),
    //     ('Hélène', 'Fischer', 'helene.fischer@msn.com', 'pass1000', 'étudiant'),
    //     ('Isabelle', 'Bernard', 'isabelle.bernard@gmail.com', 'asdf90', 'enseignant'),
    //     ('Julien', 'Noel', 'julien.noel@compte.com', 'passkey234', 'étudiant')

    // // Insertion des données dans la table spotlights
    // db.run(`INSERT INTO spotlights (spotlight_name, spotlight_state, spotlight_available) VALUES
    //     ('SAMSUNG A', 'fonctionnel', 'disponible'),
    //     ('SAMSUNG B', 'fonctionnel', 'disponible'),
    //     ('SAMSUNG C', 'non fonctionnel', 'non disponible'),
    //     ('HAIER A', 'fonctionnel', 'disponible'),
    //     ('HAIER B', 'fonctionnel', 'disponible'),
    //     ('HAIER C', 'non fonctionnel', 'non disponible'),
    //     ('THOMSON A', 'fonctionnel', 'disponible'),
    //     ('THOMSON B', 'fonctionnel', 'disponible'),
    //     ('THOMSON C', 'fonctionnel', 'disponible'),
    //     ('ASUS A', 'fonctionnel', 'disponible')
    // `)

    // // Insertion des données dans la table reservations avec les dates au format ISO
    // db.run(`INSERT INTO reservations (user_id, spotlight_id, date_start, date_end) VALUES
    //     (3, 1, '2025-03-02, 10:00', '2025-03-02, 12:00'),
    //     (4, 2, '2025-03-02, 14:00', '2025-03-02, 16:00'),
    //     (5, 4, '2025-03-03, 09:00', '2025-03-03, 11:00'),
    //     (6, 5, '2025-03-03, 13:00', '2025-03-03, 15:00'),
    //     (7, 7, '2025-03-04, 08:00', '2025-03-04, 10:00')
    // `)
    
    // db.run("DROP TABLE IF EXISTS reservations");
    // db.run("DROP TABLE IF EXISTS spotlights");
    // db.run("DROP TABLE IF EXISTS users");
})

export { db }