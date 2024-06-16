import path, {dirname} from "path"
import fs from "fs"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TodosDbFunction = {
    getTodos: async () => {
        await new Promise(r => setTimeout(r, 2000)); /// wait time
        const data = fs.readFileSync(path.resolve(__dirname,"../utils/data.json"))
        return JSON.parse(data)
    },

    saveTodos: (data) => {
     const stringifyData = JSON.stringify(data)
     fs.writeFileSync(path.resolve(__dirname,"../utils/data.json"),stringifyData)
    }
}

export default TodosDbFunction