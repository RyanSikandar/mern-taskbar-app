const express = require("express")
const dotenv = require("dotenv").config();
const connectDB = require('./config/connectDB');
const TaskManagerhds = require("./model/taskModel");
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
app.use(express.urlencoded({extended:false}))

// const logger =(req,res,next)=>{
//     console.log("Middleware ran")
//     console.log(req.method)
//     next();
// }

startServer();

app.post("/api/task",async (req,res)=>{
    try{
        // const task = await tasks.create(req.body)
        // res.status(200).json(task);
          // Create a new Task document based on request body
          const newTask = new TaskManagerhds(req.body);

          // Save the new task to the database
          await newTask.save();
  
          // Respond with the saved task as JSON
          res.status(200).json(newTask);
    }
    catch(error){
        res.status(500).json({msg: error.message})
    }

})
