import React, { useState } from 'react';
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onSignup }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('tourist');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signup({ name, email, password, role });

            // ✅ Normalize user object to include _id
            const userData = {
                _id: res.data.user.id,
                name: res.data.user.name,
                email: res.data.user.email,
                role: res.data.user.role,
            };

            localStorage.setItem('user', JSON.stringify(userData));
            onSignup(userData);
            navigate('/');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-600 font-sans">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm text-center"
            >
                <h2 className="text-2xl font-bold text-teal-600 mb-6">Signup</h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />

                <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full px-4 py-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                    <option value="tourist">Tourist</option>
                    <option value="guide">Guide</option>
                </select>

                <button
                    type="submit"
                    className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-green-500 transition-colors"
                >
                    Signup
                </button>

                <p className="mt-4 text-gray-500 text-sm">
                    Already have an account?{' '}
                    <span
                        className="text-teal-600 font-semibold cursor-pointer hover:underline"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
