import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router

const TaskList = () => {
    // State to store tasks
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        axios.get('/api/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);


    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}
                        <button>Mark as Completed</button>
                        <button>Delete</button>
                        {/*TODO Links do not work*/}
                        <Link to={`/edit/${task.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
            {/* Link to the AddTask component */}
            <Link to="/add">Add Task</Link>
        </div>
    );
}

export default TaskList;
