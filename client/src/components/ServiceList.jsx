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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Available Services</h2>
      {selectedService && (
        <Booking
          user={user}
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {services.map((srv) => (
          <div
            key={srv._id}
            className="border rounded-lg shadow-sm p-4 bg-white hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{srv.title}</h3>
            <p className="text-gray-700 mb-2">{srv.description}</p>
            <p className="mb-1"><span className="font-semibold">Category:</span> {srv.category}</p>
            <p className="mb-1"><span className="font-semibold">Price:</span> ${srv.price}</p>
            <p className="mb-1"><span className="font-semibold">Location:</span> {srv.location}</p>
            <p className="mb-3"><span className="font-semibold">Guide:</span> {srv.guide?.name}</p>

            {user?.role === 'tourist' && (
              <button
                onClick={() => setSelectedService(srv)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Book
              </button>
            )}
          </div>
        ))}
      </div>


    </div>
  );
};

export default ServiceList;
