// app/models/userModel.js

import db from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Set your secret key in environment variables

// Create a new user
export const createUser = async (name, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing it
  const result = await db.query(
    'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, role]
  );
  return result.rows[0];
};

// Login user
export const loginUser = async (email, password) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  const result = await db.query(query, values);
  const user = result.rows[0];

  if (!user) {
    throw new Error('User not found');
  }

  // Compare the entered password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Generate a JWT token
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

  return { user, token };
};
