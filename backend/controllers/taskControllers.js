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
const getTasks = async (req, res) => {
    try {
        const task = await TaskManagerhds.find()
        res.status(200).json(task)
    }
    catch (e) {
        res.status(500).json({ msg: e.message })
    }
}

const getTask = async(req,res)=>{
console.log(req.params)

try{
    let {id} = req.params
    const task = await TaskManagerhds.findById(id);
    
    if(!task){
        return res.status(404).json(`The specified task with id ${id} was not found !`)
    }
    res.status(200).json(task);

}
catch(e){
    res.status(500).json({msg:e.message})
    }


};

module.exports = {
    createTask,
    getTasks,
    getTask
}