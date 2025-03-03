// Requetes SQL pour interagir avec la table des reservations

const createReservation = 'INSERT INTO reservations (user_id, spotlight_id, date_start, date_end) VALUES (?, ?, ?, ?)'

const getReservation = 'SELECT * FROM reservations WHERE reservation_id = ?'

const getReservationById = 'SELECT * FROM reservations WHERE spotlight_id = ?'

const getAllReservations = 'SELECT * FROM reservations'

const updateReservation = 'UPDATE reservations SET user_id = ?, spotlight_id = ?, date_start = ?, date_end = ? WHERE reservation_id = ?'

const deleteReservation = 'DELETE FROM reservations WHERE reservation_id = ?'

const deleteAllReservations = 'DELETE FROM reservations'

export { createReservation, getReservation, getReservationById, getAllReservations, updateReservation, deleteReservation, deleteAllReservations }