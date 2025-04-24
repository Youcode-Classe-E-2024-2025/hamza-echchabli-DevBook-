import db from '../db/index.js'


class BookModel {
  async createBook({ title, author, category, status = 'a lire' }) {
    const result = await db.query(
      'INSERT INTO books (title, author, category, status ) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, author, category, status]
    )
    return result.rows[0]
  }


  async getAllBooks(page = 1, limit = 5) {
    const offset = (page - 1) * limit;
  
    // Query to get paginated books
    const booksQuery = `
      SELECT 
        books.* 
      FROM books
      LEFT JOIN emprut ON emprut.book_id = books.id AND emprut.returned = 0
      WHERE (emprut.id IS NULL OR emprut.returned = 1)
      LIMIT $1 OFFSET $2;
    `;
  
    // Query to get total count of books
    const totalCountQuery = `
      SELECT COUNT(*) AS total_books
      FROM books
      LEFT JOIN emprut ON emprut.book_id = books.id AND emprut.returned = 0
      WHERE (emprut.id IS NULL OR emprut.returned = 1);
    `;
  
    try {
      // Run both queries in parallel
      const [booksResult, totalCountResult] = await Promise.all([
        db.query(booksQuery, [limit, offset]),
        db.query(totalCountQuery)
      ]);
  
      // Get the total count of books
      const totalBooks = totalCountResult.rows[0].total_books;
  
      // Return books and total count
      return {
        books: booksResult.rows,
        totalBooks: totalBooks
      };
    } catch (err) {
      console.error('Error fetching books or total count', err);
      throw err;
    }
  }
  

  async getOneBookById(id) {
    const result = await db.query('SELECT * FROM books WHERE id = $1', [id])
    return result.rows[0]
  }
}

export default new BookModel()
