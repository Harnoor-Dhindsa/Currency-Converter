'use client';
import React, { useState, useEffect } from 'react';

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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Trending Page</h1>
      {rates && (
        <div>
          {Object.entries(rates).map(([currency, rate]) => (
            <p key={currency}>
              {currency}: {rate.toFixed(2)} {/* Rounding rate to 2 decimal places */}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;

