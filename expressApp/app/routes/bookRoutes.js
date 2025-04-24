import express from 'express';
import bookController from '../controllers/bookController.js';
import auth from '../middlewares/authMiddleware.js';

const bookRoutes = express.Router()

bookRoutes.post('/', auth(['admin']), bookController.create)
bookRoutes.put('/:id', auth(['admin']), bookController.update)
bookRoutes.get('/', bookController.getAll)
bookRoutes.get('/:id', bookController.getOne)

export default bookRoutes
