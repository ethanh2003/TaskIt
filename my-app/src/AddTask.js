import React, { useState } from 'react';
import axios from 'axios';


const AddTask = ({ userId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/tasks', { id: null, title, description, completed: false }, { params: { userId } })
            .then(response => {
                console.log('Task added successfully:', response.data);

            })
            .catch(error => console.error(error));

        setTitle('');
        setDescription('');
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
