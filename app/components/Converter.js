'use client';
import { useState, useEffect } from 'react';

const Converter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);

  useEffect(() => {
    fetchConversionRate();
    fetchAvailableCurrencies();
  }, [fromCurrency, toCurrency]);

  const fetchConversionRate = async () => {
    try {
      const response = await fetch(`https://api.vatcomply.com/rates`);
      const data = await response.json();
      const rate = data.rates[toCurrency] / data.rates[fromCurrency];
      setConversionRate(rate);
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
    }
  };

  const fetchAvailableCurrencies = async () => {
    try {
      const response = await fetch(`https://api.vatcomply.com/rates`);
      const data = await response.json();
      setAvailableCurrencies(Object.keys(data.rates));
    } catch (error) {
      console.error('Error fetching available currencies:', error);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleConvert = () => {
    const result = parseFloat(amount) * conversionRate;
    setConvertedAmount(result.toFixed(2));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Currency Converter</h2>
      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="border border-gray-300 rounded px-3 py-2 mr-2"
        />
        <select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          className="border border-gray-300 rounded px-3 py-2 mr-2"
        >
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span>to</span>
        <select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          className="border border-gray-300 rounded px-3 py-2 ml-2"
        >
          {availableCurrencies.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <button onClick={handleConvert} className="bg-blue-500 text-white px-4 py-2 rounded">
        Convert
      </button>
      {convertedAmount && (
        <div className="mt-4">
          <p>
            Converted Amount: {convertedAmount} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
};

export default Converter;
