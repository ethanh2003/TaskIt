import React, { useState } from 'react';
import axios from 'axios';

const EditTask = ({ task }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`/api/tasks/${task.id}`, { title, description })
            .then(response => {
                console.log('Task updated successfully:', response.data);
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default EditTask;
