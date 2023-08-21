import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from './SessionContext';
import { Link, useHistory } from 'react-router-dom';

axios.defaults.withCredentials = true;

const EditTask = ({ match }) => {
    const [task, setTask] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { token } = useSession();
    const history = useHistory();

    useEffect(() => {
        console.log("Fetching task details...");
        axios.get(`/${match.params.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log("Task details fetched:", response.data);
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
                history.push("/tasks");
            })
            .catch(error => {
                console.error(error);
            });
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
            <Link to="/tasks">Home</Link>
        </div>
    );
};

export default EditTask;
