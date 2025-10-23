import React, { useState } from 'react';
import { addService } from '../services/api';

const AddService = ({ user }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('tour');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addService({
        guide: user._id,
        title,
        description,
        category,
        price,
        location,
      });
      alert('Service added successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Error adding service.');
    }
  };

  return (
    <div>
      <h2>Add Service</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="tour">Tour</option>
          <option value="van">Van</option>
          <option value="tool">Tool</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddService;
