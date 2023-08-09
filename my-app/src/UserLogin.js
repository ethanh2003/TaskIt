import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const UserLogin = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/users/login', {
                username,
                password,
            });

            if (response.status === 200) {
                const token = response.data;
                handleLogin(token);
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            setError('An error occurred during login');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
            <Link to="/register">Register</Link>
        </div>
    );
};

export default UserLogin;