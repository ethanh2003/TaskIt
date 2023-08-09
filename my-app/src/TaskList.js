import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { Link } from 'react-router-dom';


const TaskList = ({ userId }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`/api/tasks`, { params: { userId } })
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, [userId]);

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

    const getStatusLabel = (completed) => {
        return completed ? 'Complete' : 'In Progress';
    };

    return (
        <div>
            <h1>Task List</h1>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                <tr>
                    <th style={headerStyle}>Title</th>
                    <th style={headerStyle}>Description</th>
                    <th style={headerStyle}>Status</th>
                    <th style={headerStyle}>Actions</th>
                    <th style={headerStyle}></th>
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td style={cellStyle}>{task.title}</td>
                        <td style={cellStyle}>{task.description}</td>
                        <td style={cellStyle}>{getStatusLabel(task.completed)}</td>
                        <td style={cellStyle}>
                            <button onClick={() => markAsCompleted(task.id)}>Mark as Completed</button>
                            <button onClick={() => deleteTask(task.id)}>Delete</button>
                        </td>
                        <td style={cellStyle}>
                            <Link to={`/edit/${task.id}`} style={editButtonStyle}>Edit</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Link to="/add" style={addButtonStyle}>Add Task</Link>
        </div>
    );
};


const headerStyle = {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    textAlign: 'left',
    fontWeight: 'bold',
};

const cellStyle = {
    padding: '10px',
    textAlign: 'left',
};

const actionCellStyle = {
    padding: '10px',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
};

const actionButtonStyle = {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
};

const editButtonStyle = {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
};

const addButtonStyle = {
    display: 'block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
    textAlign: 'center',
};

export default TaskList;
