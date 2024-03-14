const express = require("express")
const dotenv = require("dotenv").config();
const connectDB = require('./config/connectDB');
const TaskManagerhds = require("./models/taskModel");
const taskRouter = require("./routes/taskRoute")
const app = express();
const PORTS = process.env.PORTS || 5000
const cors = require('cors');
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

//as the front end is on local host 3000 and the backend on 5000, we use this and added before the route 
app.use(cors(
{origin:["http://localhost:3000/","mern-task"]}
))

app.use("/api/tasks", taskRouter)

// const logger =(req,res,next)=>{
//     console.log("Middleware ran")
//     console.log(req.method)
//     next();
// }

startServer();


