import express from "express"
import { todosRouter } from "./routes/index.js"
import DataSource from "./dataSource.js"

const PORT = 5000
const app = express()

app.use(express.json())

// Server health check 
app.get("/", (req, res) => {
    res.send({ msg: "Health checks !!!" })
})

// Router
app.use("/api", todosRouter)

// Global Error Middleware
app.use((error, req, res, next) => {
    if (error)
        return res.status(500).json({ msg: "Internal server error" })
})

DataSource.connect().then(()=> {
    // Port listen
    app.listen(PORT, () => {
        console.log("Server connected in port ", PORT)
    })
}).catch(error=>{
    console.log("Data source error ", error)
    // process.exit(1) -->  add if we need to stop the server
})