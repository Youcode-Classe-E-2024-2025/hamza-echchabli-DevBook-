// app/routes/categoryRoutes.js

import express from 'express';
import CategoryController from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.post('/', CategoryController.create); 
categoryRoutes.get('/', CategoryController.getAll); 
categoryRoutes.get('/:id', CategoryController.getOne); 
categoryRoutes.put('/:id', CategoryController.update); 
categoryRoutes.delete('/:id', CategoryController.delete);

export default categoryRoutes;
