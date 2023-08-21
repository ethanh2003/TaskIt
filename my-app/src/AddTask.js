import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from './SessionContext';
import {useHistory} from "react-router-dom";

axios.defaults.withCredentials = true;

const AddTask = () => {
    const { userId, token } = useSession();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    console.log(userId)
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
                history.push("/tasks")
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default AddTask;
