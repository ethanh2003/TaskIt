import React, { useState } from 'react';
import axios from 'axios';
import './UserRegister.css';

const UserRegister = () => {
    axios.defaults.withCredentials = true;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/register', { username, password, email });
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="register-container">
            <h2><center>Register</center></h2>
            <form className="register-form" onSubmit={handleRegister}>
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
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default UserRegister;
