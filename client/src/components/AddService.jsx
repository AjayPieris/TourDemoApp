import React, { useState } from "react";

const AddService = ({ user }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "tour",
    price: "",
    location: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/services", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Service added!");
      setForm({ title: "", description: "", category: "tour", price: "", location: "" });
    } else {
      alert(data.message || "Error adding service");
    }
  };

  if (!user || user.role !== "guide") return <p>Access denied.</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2 max-w-sm mx-auto">
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="tour">Tour</option>
        <option value="van">Van</option>
        <option value="tool">Tool</option>
      </select>
      <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <button type="submit">Add Service</button>
    </form>
  );
};

export default AddService;
