// app/routes/categoryRoutes.js

import express from 'express';
import CategoryController from '../controllers/categoryController.js';
import auth from '../middlewares/authMiddleware.js';


const categoryRoutes = express.Router();

categoryRoutes.post('/',  auth(['admin']),CategoryController.create); 
categoryRoutes.get('/', auth(['admin']) ,  CategoryController.getAll); 
categoryRoutes.put('/:id',  auth(['admin']), CategoryController.update); 
categoryRoutes.delete('/:id', auth(['admin']) , CategoryController.delete);

export default categoryRoutes;
