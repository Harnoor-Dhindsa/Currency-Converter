'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

const Trending = () => {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await fetch(`https://api.vatcomply.com/rates?base=CAD`);
      const data = await response.json();
      setRates(data.rates);
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-cover">
      <h1 className="text-3xl font-bold mb-8 text-white">Trending Page</h1>
      <h2 className="text-xl mb-4 text-white font-semibold flex items-center">
         Currencies compared to 1 CAD
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {rates && (
          Object.entries(rates).map(([currency, rate]) => (
            <div key={currency} className="bg-gray-800 p-4 rounded-lg text-white">
              {/* Insert flag or currency icon here */}
              <p className="font-bold mb-2 text-2xl">{currency}</p>
              <p className="font-bold">{rate.toFixed(2)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Trending;
