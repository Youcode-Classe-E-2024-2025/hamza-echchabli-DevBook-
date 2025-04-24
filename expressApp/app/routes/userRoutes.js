// app/routes/userRoutes.js

import express from 'express';
import userController from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', userController.registerUser); 
userRoutes.post('/login', userController.loginUserController); 

export default userRoutes;
