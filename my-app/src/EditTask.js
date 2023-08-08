import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const EditTask = ({ match }) => {
    const [task, setTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        axios.get(`/api/tasks/${match.params.id}`)
            .then(response => {
                setTask(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
            })
            .catch(error => console.error(error));
    }, [match.params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTask = {
            ...task,
            title: title.trim(),
            description: description.trim(),
        };

        axios.put(`/api/tasks/${task.id}`, updatedTask)
            .then(response => {
                console.log('Task updated successfully:', response.data);

            })
            .catch(error => console.error(error));
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
            <Link to="/">Home</Link>
        </div>
    );
};

export default EditTask;
