import db from './../database/database.js'

const spotlight = {
  createUser: (nom, prenom, email, mot_de_passe, role, callback) => {
    db.run('INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)', [nom, prenom, email, mot_de_passe, role], callback)
  },
  
  getAllUsers: (callback) => {
    db.all('SELECT * FROM utilisateurs', [], callback)
  },

  getUser: (callback) => {
    db.get('SELECT * FROM utilisateurs WHERE id_utilisateur = ?', [id_utilisateur], callback)
  },

  deleteUser: (callback) => {
    db.run('DELETE FROM utilisateurs WHERE id_utilisateur = ?', [id_utilisateur], callback)
  },

  createSpotlight: (nom_projecteur, etat_projecteur, callback) => {
    db.run('INSERT INTO projecteurs (nom_projecteur, etat_projecteur) VALUES (?, ?)', [nom_projecteur, etat_projecteur], callback)
  },
  
  getAllSpotlights: (callback) => {
    db.all('SELECT * FROM projecteurs', [], callback)
  },

  getSpotlight: (callback) => {
    db.get('SELECT * FROM projecteurs WHERE id_projecteur = ?', [id_projecteur], callback)
  },

  deleteSpotlight: (callback) => {
    db.run('DELETE FROM projecteurs WHERE id_projecteur = ?', [id_projecteur], callback)
  },

  newReservation: (id_utilisateur, id_projecteur, date_debut, date_fin, callabck) => {
    db.run('INSERT INTO reservations (id_utilisateur, id_projecteur, date_debut, date_fin) VALUES (?, ?, ?, ?)', [id_utilisateur, id_projecteur, date_debut, date_fin], callback)
  },

  getAllReservations: (callback) => {
    db.all('SELECT * FROM reservations', [], callback)
  },

  deleteReservation: (callback) => {
    db.run('DELETE FROM reservations WHERE id_reservation = ?', [id_reservation], callback)
  }
}

export default spotlight