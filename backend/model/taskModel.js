const mongoose = require("mongoose")

const taskSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a task name"]
        },
        completed: {
            type: Boolean,
            required: true,
            default: false
        }
    },{
        timestamps:true,
    }
);

const TaskManagerhds = mongoose.models.TaskManagerss || mongoose.model("TaskManagerss", taskSchema)
module.exports = TaskManagerhds;