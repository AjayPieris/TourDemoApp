import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddService from "./components/AddService";
import ServiceList from "./components/ServiceList";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/">Home</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/signup">Signup</Link>}
        {user?.role === "guide" && <Link to="/add-service">Add Service</Link>}
      </nav>

      <Routes>
        <Route
          path="/"
          element={user ? <ServiceList user={user} /> : <p>Please login.</p>}
        />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup onSignup={setUser} />} />
        <Route path="/add-service" element={<AddService user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
