import React, { useState } from 'react';
import { signup } from '../services/api';

const Signup = ({ onSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('tourist');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signup({ name, email, password, role });
            console.log(res.data);
            onSignup(res.data.user);
        } catch (err) {
            console.error(err);
            alert(err.response.data.message);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                <select value={role} onChange={e => setRole(e.target.value)}>
                    <option value="tourist">Tourist</option>
                    <option value="guide">Guide</option>
                </select>
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
