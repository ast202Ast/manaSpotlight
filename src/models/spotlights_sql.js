import { db } from '../database/db_configs.js'

// Requetes SQL pour interagir avec la table des projecteurs

const createSpotlight = 'INSERT INTO spotlights (spotlight_name, spotlight_state) VALUES (?, ?)'

const getSpotlight = 'SELECT spotlight_id, spotlight_name, spotlight_state FROM spotlights WHERE spotlight_id = ?'

const getAllSpotlights = 'SELECT * FROM spotlights'

const updateSpotlight = 'UPDATE spotlights SET spotlight_name = ?, spotlight_state = ? WHERE spotlight_id = ?'

// const updateSpotlightName = 'UPDATE spotlights SET spotlight_name = ? WHERE spotlight_id = ?'

// const updateSpotlightState = 'UPDATE spotlights SET spotlight_state = ? WHERE spotlight_id = ?'

const deleteSpotlight = 'DELETE FROM spotlights WHERE spotlight_id = ?'

const deleteAllSpotlights = 'DELETE FROM spotlights'

export { createSpotlight, getSpotlight, getAllSpotlights, updateSpotlight, deleteSpotlight, deleteAllSpotlights }