import express from 'express'
import emprutController from '../controllers/emprutController.js'
import auth from '../middlewares/authMiddleware.js'

const emprutRoutes = express.Router()

emprutRoutes.post('/',  auth('client'), emprutController.create)
emprutRoutes.get('/', auth('client'), emprutController.getAll)
emprutRoutes.get('/:id',  auth('client'), emprutController.getOne)
emprutRoutes.put('/:id',  auth('client'), emprutController.update)

export default emprutRoutes
