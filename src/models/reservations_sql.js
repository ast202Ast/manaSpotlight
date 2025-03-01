import { db } from '../database/db_configs.js'

// Requetes SQL pour interagir avec la table des reservations

const createReservation = 'INSERT INTO reservations (user_id, spotlight_id, date_start, date_end) VALUES (?, ?, ?, ?)'

const getReservation = 'SELECT reservation_id, user_id, spotlight_id, date_start, date_end FROM reservations WHERE reservation_id = ?'

const getAllReservations = 'SELECT * FROM reservations'

const updateReservation = 'UPDATE reservations SET user_id = ?, spotlight_id = ?, date_start = ?, date_end = ? WHERE reservation_id = ?'

// const updateUserId = 'UPDATE reservations SET user_id = ? WHERE reservation_id = ?'

// const updateSpotlightId = 'UPDATE reservations SET spotlight_id = ? WHERE reservation_id = ?'

// const updateDateStart = 'UPDATE reservations SET date_start = ? WHERE reservation_id = ?'

// const updateDateEnd = 'UPDATE reservations SET date_end = ? WHERE reservation_id = ?'

const deleteReservation = 'DELETE FROM reservations WHERE reservation_id = ?'

const deleteAllReservations = 'DELETE FROM reservations'

export { createReservation, getReservation, getAllReservations, updateReservation, deleteReservation, deleteAllReservations }