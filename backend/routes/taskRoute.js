const express = require("express")
const TaskManagerhds = require("../models/taskModel")
const { createTask, getTasks, getTask } = require("../controllers/taskControllers")
const router = express.Router()

//Post tasks
router.post("/api/tasks", createTask)

//Get tasks
router.get("/api/tasks", getTasks)

//get single task
router.get("/api/tasks/:id",getTask)

module.exports = router;