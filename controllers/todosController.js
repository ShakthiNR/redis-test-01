import TodosDbFunction from "../models/TodosModel.js"

/**
 * @description Todos Controller
 * @author Shakthi NR
 */
const TodosController = {
    /**
     * @returns lists of todos
     */
    getTodos: (req, res, next) => {
        try {
            const data = TodosDbFunction.getTodos()
            return res.status(200).json({ data, status: 200 })
        } catch (error) {
            next(error)
        }
        
    },
    createTodos: (req, res, next) => {
        try {
            const data = req.body; 
            const dbData = TodosDbFunction.getTodos()
            dbData.push(data)
            TodosDbFunction.saveTodos(dbData)
            return res.status(201).json({ status: 201, msg: "Todo created successfully" })
        } catch (error) {
            next(error)
        }
    }
}

export default TodosController