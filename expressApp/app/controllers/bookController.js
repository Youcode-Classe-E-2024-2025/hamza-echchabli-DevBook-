import BookModel from '../models/bookModel.js';
import upload from '../routes/multerConfig.js';

const bookController = {
    async create(req, res) {
        try {
          const { title, description, categorie_id } = req.body;
          const image = req.file ? req.file.path : null;
      
          const newBook = await BookModel.createBook({
            title,
            description,
            image,
            categorie_id,
          });
      
          res.status(201).json(newBook);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to create book' });
        }
      }

      ,

  
  async getAll(req, res) {
    try {
      const books = await BookModel.getAllBooks()
      console.log(books);
      
      res.json(books)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to fetch books' })
    }
  },

  async getOne(req, res) {
    try {
      const { id } = req.params
      const book = await BookModel.getOneBookById(id)
      if (!book) {
        return res.status(404).json({ error: 'Book not found' })
      }
      res.json(book)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to fetch book' })
    }
  }
}

export default bookController
