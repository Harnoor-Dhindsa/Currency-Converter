import { useState, useEffect } from "react";

const Converter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
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
      console.error("Error fetching conversion rate:", error);
    }
  };

  const fetchAvailableCurrencies = async () => {
    try {
      const response = await fetch(`https://api.vatcomply.com/rates`);
      const data = await response.json();
      setAvailableCurrencies(Object.keys(data.rates));
    } catch (error) {
      console.error("Error fetching available currencies:", error);
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
    <div className="flex flex-col items-center justify-center mb-20 p-0 mr-16">
      <h2 className="text-2xl mb-4 font-semibold">Convert your currency</h2>
      <div className="mb-4 flex flex-col items-center">
        <div className="mb-2">
          <input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="border border-white rounded px-7 py-2 mr-2 text-black placeholder-gray-400"
          />
        </div>
        <div className="flex justify-center">
          <select
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            className="border border-gray-300 rounded px-3 py-2 m-5 text-black"
          >
            {availableCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span className="text-gray-400 text-3xl m-5">⇄</span>
          <select
            value={toCurrency}
            onChange={handleToCurrencyChange}
            className="border border-gray-300 rounded px-3 py-2 m-5 text-black"
          >
            {availableCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleConvert}
        className="bg-gray-500 text-white font-semibold px-10 py-2 rounded-lg hover:bg-gray-600 "
      >
        Convert
      </button>
      {convertedAmount && (
        <div className="bg-gray-700 rounded-lg p-4 m-10">
          <p className="text-lg font-semibold">
            Converted Amount: {convertedAmount} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
};

export default Converter;
