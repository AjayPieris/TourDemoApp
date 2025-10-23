import React, { useState } from "react";

const Signup = ({ onSignup }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "tourist",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      onSignup(data);
    } else {
      alert(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2 max-w-sm mx-auto">
      <h2>Signup</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="tourist">Tourist</option>
        <option value="guide">Guide</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
