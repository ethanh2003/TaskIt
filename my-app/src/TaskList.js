import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSession } from './SessionContext';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const { userId, token } = useSession();

    useEffect(() => {
        axios.get(`/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: { userId }
        })
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, [userId, token]);

    const deleteTask = (id) => {
        axios.delete(`/${id}`)
            .then(response => {
                console.log('Task deleted successfully:', id);
                setTasks(tasks.filter(task => task.id !== id));
            })
            .catch(error => console.error(error));
    };

    const markAsCompleted = (id, completed) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !completed };
            }
            return task;
        });

        axios.put(`/tasks/${id}/complete`, null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Task status updated:', response.data);
                setTasks(updatedTasks);
            })
            .catch(error => console.error(error));
    };

    const getStatusLabel = (completed) => {
        return completed ? 'Complete' : 'In Progress';
    };

    return (
        <div className="task-list-container">
            <h1 className="task-list-title">Task List</h1>
            <table className="task-table">
                <thead>
                <tr>
                    <th className="header-cell">Title</th>
                    <th className="header-cell">Description</th>
                    <th className="header-cell">Status</th>
                    <th className="header-cell">Actions</th>
                    <th className="header-cell"></th>
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td className="cell">{task.title}</td>
                        <td className="cell">{task.description}</td>
                        <td className="cell">{getStatusLabel(task.completed)}</td>
                        <td className="action-cell">
                            <button
                                className={
                                    task.completed ? 'action-button-in-progress' : 'action-button-complete'
                                }
                                onClick={() => markAsCompleted(task.id, task.completed)}
                            >
                                {task.completed ? 'Mark In Progress' : 'Mark as Completed'}
                            </button>
                            <button
                                className="action-button-delete"
                                onClick={() => deleteTask(task.id)}
                            >
                                Delete
                            </button>
                        </td>
                        <td className="cell">
                            <Link to={`/tasks/${task.id}`} className="edit-link">
                                Edit
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/add" className="add-link">Add Task</Link>
        </div>
    );
};

export default TaskList;
