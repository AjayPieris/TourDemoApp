import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AddService from './components/AddService';
import ServiceList from './components/ServiceList';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🧠 Keep user logged in after refresh using localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div>
      {/* 🔗 Navigation Bar */}
      <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
        <Link to="/">Home</Link> |{' '}
        {!user && (
          <>
            <Link to="/login">Login</Link> |{' '}
            <Link to="/signup">Signup</Link>
          </>
        )}
        {user && user.role === 'guide' && (
          <>
            {' '}| <Link to="/add-service">Add Service</Link>
          </>
        )}
        {user && (
          <>
            {' '}| <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      {/* 🔄 Page Routing */}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <ServiceList user={user} />
            ) : (
              <p style={{ padding: '20px' }}>Please login to view services.</p>
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
        <Route path="/add-service" element={<AddService user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
