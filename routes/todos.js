import express from 'express'
import { TodosController } from '../controllers/index.js'
const router = express.Router()

router.get("/todos", TodosController.getTodos)
router.get("/todos/:id", TodosController.getTodo)
router.post("/todos", TodosController.createTodos)

export default router