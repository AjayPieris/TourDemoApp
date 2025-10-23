import React, { useEffect, useState } from 'react';
import { getServices } from '../services/api';
import Booking from './Booking';

const ServiceList = ({ user }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await getServices();
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div>
      <h2>Available Services</h2>
      {services.map((srv) => (
        <div key={srv._id} style={{ border: '1px solid gray', padding: '10px', margin: '10px' }}>
          <h3>{srv.title}</h3>
          <p>{srv.description}</p>
          <p><b>Category:</b> {srv.category}</p>
          <p><b>Price:</b> ${srv.price}</p>
          <p><b>Location:</b> {srv.location}</p>
          <p><b>Guide:</b> {srv.guide?.name}</p>
          {user.role === 'tourist' && (
            <button onClick={() => setSelectedService(srv)}>Book</button>
          )}
        </div>
      ))}

      {selectedService && <Booking user={user} service={selectedService} onClose={() => setSelectedService(null)} />}
    </div>
  );
};

export default ServiceList;
