// app/routes/userRoutes.js

import express from 'express';
import userController from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', userController.registerUser); // Register user
userRoutes.post('/login', userController.loginUserController); // Login user

export default userRoutes;
