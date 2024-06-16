import TodosDbFunction from "../models/TodosModel.js"
import { getStringValue, setStringValue } from "../redis.js"

/**
 * @description Todos Controller
 * @author Shakthi NR
 */
const TodosController = {
    /**
     * @returns lists of todos
     */
    getTodos: async (req, res, next) => {
        try {
            let cacheValue = await getStringValue("todo:data")
            if (cacheValue) {
                console.log("Value exists in redis memory")
                return res.status(200).json({ data: cacheValue, status: 200 })
            }
            const data = await TodosDbFunction.getTodos()
            setStringValue("todo:data", data)
            return res.status(200).json({ data, status: 200 })
        } catch (error) {
            next(error)
        }
    },
    getTodo: async (req, res, next) => {
        try {
            const todoId = req.params.id
            let cacheValue = await getStringValue(`todo:${todoId}`)

            if (cacheValue) {
                console.log("Value exists in redis memory")
                return res.status(200).json({ data: cacheValue, status: 200 })
            }

            const data = await TodosDbFunction.getTodos()
            const result = data?.find(elm => elm.id.toString() === todoId)
            if (!result) return res.status(404).json({ msg: "Todo not found", status: 404 })
            setStringValue(`todo:${todoId}`, result)
            return res.status(200).json({ data: result, status: 200 })

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