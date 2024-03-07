const express = require("express")
const TaskManagerhds = require("../models/taskModel")
const { createTask, getTasks, getTask, deleteTask, updateTask } = require("../controllers/taskControllers")
const router = express.Router()

//Post tasks
router.post("/", createTask)

//Get tasks
router.get("/", getTasks)

//get single task
router.get("/:id",getTask)

//delete a task
router.delete("/:id",deleteTask);

//Update method
router.put("/:id",updateTask)

//Patch Method
router.patch("/:id",updateTask)

module.exports = router;