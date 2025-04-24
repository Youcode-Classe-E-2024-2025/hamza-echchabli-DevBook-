import express from 'express';
import bookController from '../controllers/bookController.js';
import auth from '../middlewares/authMiddleware.js';
import upload from './multerConfig.js';


const bookRoutes = express.Router()

bookRoutes.post('/',  upload.single('image') ,auth(['admin']), bookController.create)
bookRoutes.get('/', bookController.getAll)
bookRoutes.get('/:id', bookController.getOne)

export default bookRoutes
