const TaskManagerhds = require("../models/taskModel")

const createTask = async (req, res) => {
    try {
        // const task = await tasks.create(req.body)
        // res.status(200).json(task);
        // Create a new Task document based on request body
        const newTask = new TaskManagerhds(req.body);

        // Save the new task to the database
        await newTask.save();

        // Respond with the saved task as JSON
        res.status(200).json(newTask);
    }
    catch (error) {
        res.status(500).json({ msg: error.message })
    }

};

//Get all tasks
const getTasks = async (req, res) => {
    try {
        const task = await TaskManagerhds.find()
        res.status(200).json(task)
    }
    catch (e) {
        res.status(500).json({ msg: e.message })
    }
}

//Get a single task
const getTask = async (req, res) => {
    try {
        let { id } = req.params
        console.log(id)
        const task = await TaskManagerhds.findById(id);

        if (!task) {
            return res.status(404).json(`The specified task with id ${id} was not found !`)
        }
        res.status(200).json(task);

    }
    catch (e) {
        res.status(500).json({ msg: e.message })
    }


};

//Delete a task

const deleteTask=async(req,res)=>{
    try{
        const {id} = req.params;
        const task_delete = await TaskManagerhds.findByIdAndDelete(id);
        if(!task_delete){
            res.status(404).json(`Task with ID:${id} could not be found`);
        }
        res.status(200).json(`Task with id ${id} has been deleted`);
    }
    catch(e){
        res.status(500).json({msg:e.message})
    }
}

const updateTask=async(req,res)=>{
    try{
        const {id} = req.params
        const task_update = await TaskManagerhds.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
        res.status(200).json(task_update)
    }
    catch(e){
        res.status(500).json({msg:e.message})
    }
}
module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask,
}