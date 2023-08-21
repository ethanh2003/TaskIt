import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSession } from './SessionContext';
import './UserLogin.css';

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
        <div className="login-container">
            <h2><center>Login</center></h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <Link to="/register" className="register-link">
                Don't have an account? Register here.
            </Link>
        </div>
    );
};

export default UserLogin;
