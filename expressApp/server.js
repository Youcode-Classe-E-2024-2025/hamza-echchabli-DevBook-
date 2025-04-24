
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// import bookRoutes from './app/routes/book.routes.js'import bookRoutes from './app/routes/bookRoutes.js';


import categoryRoutes from './app/routes/categoryRoutes.js';

import bookRoutes from './app/routes/bookRoutes.js';

import userRoutes from './app/routes/userRoutes.js'

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


app.use('/api/users', userRoutes)

app.use('/api/books', bookRoutes)

app.use('/api/categories', categoryRoutes);



app.get('/', (req, res) => {
  res.render('components/home', { name: 'Hamza' })
})



app.get('/auth', (req, res) => {
  res.render('components/auth', { error: null })
})

app.get('/dashboard', (req, res) => {

  console.log('req.session.user');
  
  
  res.render('components/dash')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})