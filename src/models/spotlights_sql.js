// Requetes SQL pour interagir avec la table des projecteurs

const createSpotlight = 'INSERT INTO spotlights (spotlight_name, spotlight_state, spotlight_available) VALUES (?, ?, ?)'

const getSpotlight = 'SELECT * FROM spotlights WHERE spotlight_id = ?'

const getSpotlightAvailable = 'SELECT * FROM spotlights WHERE spotlight_available = ?'

const getAllSpotlights = 'SELECT * FROM spotlights'

const updateSpotlight = 'UPDATE spotlights SET spotlight_state = ?, spotlight_available = ? WHERE spotlight_id = ?'

const updateSpotlightAvailable = 'UPDATE spotlights SET spotlight_available = ? WHERE spotlight_id = ?'

const deleteSpotlight = 'DELETE FROM spotlights WHERE spotlight_id = ?'

const deleteAllSpotlights = 'DELETE FROM spotlights'

export { createSpotlight, getSpotlight, getSpotlightAvailable, getAllSpotlights, updateSpotlight, updateSpotlightAvailable, deleteSpotlight, deleteAllSpotlights }