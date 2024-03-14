import React, { useEffect, useState } from 'react'
import TaskForm from "../components/TaskForm"
import Task from './Task'
import { toast } from 'react-toastify';
import axios from 'axios';
import { URL } from "../App"
import loadingImage from "../assets/loader.gif"
//http://localhost:5000/api/tasks

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    completed: false
  });

  const { name } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, name: value })
  };

  const createTask = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (name === "") {
      return toast.error("Input Field cannot be empty");
    }

    try {
      //we have used proxy url here 
      await axios.post(`${URL}/api/tasks`, formData)
      toast.success("Task added successfully")
      setFormData({ ...formData, name: "" })
    }
    catch (error) {
      toast.error(error.message);
      console.log(error)

    }
  }

  const getTasks = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.get(`${URL}/api/tasks`)
      setTasks(data);
      setIsLoading(false)
    }
    catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  };

  useEffect(() => { getTasks() }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks()
    }
    catch (e) {
      toast.error(e.message)
    }
  }
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm name={name} handleInputChange={handleInputChange} createTask={createTask} />
      <div className="--flex-between --pb">
        <p>
          <b>Total Task:</b> 0
        </p>
        <p>
          <b>Completed Task:</b> 0
        </p>
      </div>
      <hr />
      {
        isLoading && (
          <div className='--flex-center'>
            <img src={loadingImage} alt="loader gif" />
          </div>
        )
      }

      {
        !isLoading && tasks.length === 0 ? (
          <p className='--py'>No Task Found. Please add a task !</p>
        ) : (
          <div>
            {
              tasks.map((task, index) => {
                return <Task key={task._id} task={task} index={index} deleteTask={deleteTask}/>
              })
            }</div>
        )
      }

    </div>

  )
}

export default TaskList