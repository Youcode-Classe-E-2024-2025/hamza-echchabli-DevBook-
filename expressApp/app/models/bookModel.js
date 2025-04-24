import db from '../db/index.js'

class BookModel {
  async createBook({ title, description, image, categorie_id }) {
    const result = await db.query(
      `INSERT INTO books (title, description, image, categorie_id) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description, image, categorie_id]
    )
    return result.rows[0]
  }

  async updateBook(id, { title, description, image, categorie_id }) {
    const result = await db.query(
      `UPDATE books 
       SET title = $1, description = $2, image = $3, categorie_id = $4 
       WHERE id = $5 RETURNING *`,
      [title, description, image, categorie_id, id]
    )
    return result.rows[0]
  }

  async getAllBooks() {
    const result = await db.query('SELECT * FROM books')
    return result.rows
  }

  async getOneBookById(id) {
    const result = await db.query('SELECT * FROM books WHERE id = $1', [id])
    return result.rows[0]
  }
}

export default new BookModel()
