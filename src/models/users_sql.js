import { db } from '../database/db_configs.js'

// Requetes SQL pour interagir avec la table des utilisateurs

const createUser = 'INSERT INTO users (user_firstname, user_lastname, user_email, user_password, user_role) VALUES (?, ?, ?, ?, ?)'

const getUser = 'SELECT user_id, user_firstname, user_lastname, user_email, user_role FROM users WHERE user_id = ?'

const getUserByEmail = 'SELECT user_id, user_firstname, user_lastname, user_email, user_role FROM users WHERE user_email = ?'

const getAllUsers = 'SELECT user_id, user_firstname, user_lastname, user_email, user_role FROM users'

const updateUser = 'UPDATE users SET user_firstname = ?, user_lastname = ?, user_email = ?, user_password = ?, user_role = ? WHERE user_id = ?'

// const updateFirstname = 'UPDATE users SET user_firstname = ? WHERE user_id = ?'

// const updateLastname = 'UPDATE users SET user_lastname = ? WHERE user_id = ?'

// const updateEmail = 'UPDATE users SET user_email = ? WHERE user_id = ? '

// const updatePassword = 'UPDATE users SET user_password = ? WHERE user_id = ?'

const deleteUser = 'DELETE FROM users WHERE user_id = ?'

const deleteAllUsers = 'DELETE FROM users'

export { createUser, getUser, getUserByEmail, getAllUsers, updateUser, deleteUser, deleteAllUsers }
