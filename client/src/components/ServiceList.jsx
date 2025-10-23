import React, { useEffect, useState } from "react";

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("http://localhost:5000/api/services");
      const data = await res.json();
      setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Services</h2>
      {services.map((s) => (
        <div key={s._id} className="border p-2 mb-2 rounded">
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <p>Price: ${s.price}</p>
          <p>Category: {s.category}</p>
          <p>Location: {s.location}</p>
          <p>Guide: {s.guide.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
