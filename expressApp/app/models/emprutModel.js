import db from '../db/index.js'

export const createEmprut = async (user_id, book_id) => {
  const result = await db.query(
    `INSERT INTO emprut (user_id, book_id)
     VALUES ($1, $2)
     RETURNING *`,
    [user_id, book_id]
  )
  return result.rows[0]
}

export const getAllEmpruts = async () => {
  const result = await db.query('SELECT * FROM emprut ORDER BY created_at DESC')
  return result.rows
}

export const getEmprutById = async (id) => {
  const result = await db.query('SELECT * FROM emprut WHERE id = $1', [id])
  return result.rows[0]
}

export const updateEmprutStatus = async (id, status, returned) => {
  const result = await db.query(
    `UPDATE emprut
     SET status = $1, returned = $2
     WHERE id = $3
     RETURNING *`,
    [status, returned, id]
  )
  return result.rows[0]
}
