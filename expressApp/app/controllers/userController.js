
import { createUser, loginUser } from '../models/userModel.js';


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await createUser(name, email, password, 'client');
    res.status(201).json(user);
  } catch (error) {
    if (error.code === '23505') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};


const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { user, token } = await loginUser(email, password);
    res.status(200).json({
      message: 'Login successful',
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid credentials' });
  }
}

export default {
  registerUser,
  loginUserController
};
