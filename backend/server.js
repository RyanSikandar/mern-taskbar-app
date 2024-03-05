const express = require("express")
const dotenv = require("dotenv").config();
const connectDB = require('./config/connectDB');
const TaskManagerhds = require("./models/taskModel");
const taskRouter = require("./routes/taskRoute")
const app = express();
const PORTS = process.env.PORTS || 5000

app.get('/', (req, res) => {
    res.send("hello from home page")
})

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORTS, () => {
            console.log(`Server running on port ${PORTS}`);;
        })
    }
    catch (error) {
        console.log(error)
    }
}

//Middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(taskRouter)

// const logger =(req,res,next)=>{
//     console.log("Middleware ran")
//     console.log(req.method)
//     next();
// }

startServer();


