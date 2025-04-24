import express from 'express'
import bookController from '../controllers/bookController.js'

const bookRoutes = express.Router()

bookRoutes.post('/', bookController.create)
bookRoutes.put('/:id', bookController.update)
bookRoutes.get('/', bookController.getAll)
bookRoutes.get('/:id', bookController.getOne)

export default bookRoutes
