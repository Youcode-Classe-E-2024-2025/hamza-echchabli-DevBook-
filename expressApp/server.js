
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import categoryRoutes from './app/routes/categoryRoutes.js';

import bookRoutes from './app/routes/bookRoutes.js';

import userRoutes from './app/routes/userRoutes.js';

import emprutRoutes from './app/routes/emprutRoutes.js';
import path from 'path'
import { fileURLToPath } from 'url'



dotenv.config()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))  


app.use(express.static('public'))


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.use('/api/users', userRoutes);



app.use('/api/books', bookRoutes);


app.use('/api/categories', categoryRoutes);


app.use('/api/emprut', emprutRoutes);

app.get('/', (req, res) => {
  res.render('components/home')
})

app.use('/uploads', express.static('uploads'));



app.get('/auth', (req, res) => {
  res.render('components/auth')
})

// Using Express.js for routing
app.get('/details/:id', async (req, res) => {
  const bookId = req.params.id;  // Access the book ID from the route parameter

  // Fetch book details from the database
  try {
    const result = await db.query(
      'SELECT * FROM books WHERE id = $1', 
      [bookId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).send('Book not found');
    }

    const book = result.rows[0];  // Get the book from the query result
    
    // Render the details page and pass the book details to the view
    res.render('components/details', { book });
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching book details');
  }
});


// Fetch the user's loaned books
app.get('/profile', async (req, res) => {
  const userId = getUserIdFromToken(req.headers['authorization']);  // Extract user ID from the token
  
  try {
    // Get loaned books for the user with their status
    const result = await db.query(
      `SELECT books.*, emprut.status
       FROM books
       JOIN emprut ON emprut.book_id = books.id
       WHERE emprut.user_id = $1 AND emprut.returned = 0`, // Assuming 0 means not returned
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('No loaned books found');
    }

    const loanedBooks = result.rows;  // List of loaned books
    
    res.render('profile', { loanedBooks });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching loaned books');
  }
});


// Update the loan status
app.put('/api/emprut/update-status', async (req, res) => {
  const { book_id, status } = req.body;
  const userId = getUserIdFromToken(req.headers['authorization']);

  try {
    // Update the status of the book
    const result = await db.query(
      `UPDATE emprut 
       SET status = $1 
       WHERE book_id = $2 AND user_id = $3 AND returned = 0
       RETURNING *`,
      [status, book_id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found or already returned' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});


// Return the loaned book
app.put('/api/emprut/return', async (req, res) => {
  const { book_id } = req.body;
  const userId = getUserIdFromToken(req.headers['authorization']);

  try {
    // Mark the book as returned
    const result = await db.query(
      `UPDATE emprut
       SET returned = 1 
       WHERE book_id = $1 AND user_id = $2 AND returned = 0
       RETURNING *`,
      [book_id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Book not found or already returned' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to return book' });
  }
});



app.get('/dashboard', (req, res) => {

  console.log('req.session.user');
  
  
  res.render('components/dash')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  
})