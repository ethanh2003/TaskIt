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

    const deleteTask = (id) => {
        axios.delete(`/api/tasks/${id}`)
            .then(response => {
                console.log('Task deleted successfully:', id);
                setTasks(tasks.filter(task => task.id !== id));
            })
            .catch(error => console.error(error));
    };


    const markAsCompleted = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: true };
            }
            return task;
        });

        axios.put(`/api/tasks/${id}`, { completed: true })
            .then(response => {
                console.log('Task marked as completed:', response.data);
                setTasks(updatedTasks);
            })
            .catch(error => console.error(error));
    };



    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title}
                        {/*TODO Delete and complete do not work*/}
                        <button onClick={() => markAsCompleted(task.id)}>Mark as Completed</button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
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
