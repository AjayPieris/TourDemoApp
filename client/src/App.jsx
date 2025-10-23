import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AddService from './components/AddService';
import ServiceList from './components/ServiceList';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Keep user logged in after refresh
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="p-4 bg-white shadow-md flex justify-between items-center">
        {/* Left side */}
        <div>
          <Link to="/" className="font-bold text-xl text-blue-600 hover:underline">
            Home
          </Link>
        </div>

        {/* Right side */}
        <div>
          {!user && (
            <>
              <Link to="/login" className="mr-4 text-gray-700 hover:text-blue-600 hover:underline">
                Login
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-blue-600 hover:underline">
                Signup
              </Link>
            </>
          )}
          {user && user.role === 'guide' && (
            <Link to="/add-service" className="mr-4 text-gray-700 hover:text-blue-600 hover:underline">
              Add Service
            </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Page Routing */}
      <main className="p-6">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <ServiceList user={user} />
              ) : (
                <p className="text-center text-gray-700 text-lg mt-10">
                  Please login to view services.
                </p>
              )
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup onSignup={handleSignup} />} />
          <Route path="/add-service" element={<AddService user={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
