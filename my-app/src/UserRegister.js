import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const UserRegister = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users/register', { username, password, email });

        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default UserRegister;