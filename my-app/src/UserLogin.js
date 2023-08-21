import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSession } from './SessionContext';

const UserLogin = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setSessionUserId, setSessionToken } = useSession();
    const history = useHistory();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', {
                username,
                password,
            });

            if (response.status === 200) {
                console.log('Login successful');
                const token = response.data.token;
                const userId = response.data.userId;

                setSessionUserId(userId);
                setSessionToken(token);
                handleLogin(token, userId);

                history.push('/tasks');
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
