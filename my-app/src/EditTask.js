import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from './SessionContext';
import { Link, useHistory } from 'react-router-dom';
import './EditTask.css';

axios.defaults.withCredentials = true;

const EditTask = ({ match }) => {
    const [task, setTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { token } = useSession();
    const history = useHistory();

    useEffect(() => {
        console.log('Fetching task details...');
        axios.get(`/${match.params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Task details fetched:', response.data);
                setTask(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
            })
            .catch(error => console.error(error));
    }, [match.params.id, token]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTask = {
            title: title.trim(),
            description: description.trim(),
            completed: task.completed
        };

        axios.put(`/tasks/${task.id}`, updatedTask, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Task updated successfully:', response.data);
                history.push('/tasks');
            })
            .catch(error => {
                console.error(error);
            });
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-task-container">
            <h2><center>Edit Task</center></h2>
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
                <button type="submit" className="update-button">Update</button>
            </form>
            <button onClick={() => history.push('/tasks')} className="back-button">
                Back to Tasks
            </button>
        </div>
    );
};

export default EditTask;
