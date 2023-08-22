import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from './SessionContext';
import { useHistory } from 'react-router-dom';
import './AddTask.css';

axios.defaults.withCredentials = true;

const AddTask = () => {
    const { userId, token } = useSession();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/add', { id: null, title, description, completed: false }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                userId
            }
        })
            .then(response => {
                console.log('Task added successfully:', response.data);
                setTitle('');
                setDescription('');
                history.push('/tasks');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="add-task-container">
            <h2><center>Add Task</center></h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title"><b>Title:</b></label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="task-input"
                />
                <label htmlFor="description"><b>Description:</b></label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="task-input"
                />
                <button type="submit" className="add-button">Add</button>
            </form>
            <button onClick={() => history.push('/tasks')} className="back-button">
                Back to Tasks
            </button>
        </div>
    );
};

export default AddTask;
