import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const CryptoPriceTracker = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch cryptocurrency data');
        }

        const data = await response.json();
        setCryptoData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchCryptoPrices();
    const intervalId = setInterval(fetchCryptoPrices, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Cryptocurrency Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading cryptocurrency data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Top 10 Cryptocurrencies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {cryptoData.map((crypto) => (
            <div 
              key={crypto.id} 
              className="flex flex-col items-center p-4 border rounded-lg shadow-sm"
            >
              <img 
                src={crypto.image} 
                alt={`${crypto.name} logo`} 
                className="w-16 h-16 mb-2"
              />
              <h3 className="font-bold">{crypto.symbol.toUpperCase()}</h3>
              <p className="text-green-600 font-semibold">
                ${crypto.current_price.toLocaleString()}
              </p>
              <p className={`
                ${crypto.price_change_percentage_24h > 0 
                  ? 'text-green-600' 
                  : 'text-red-600'
                }`}
              >
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoPriceTracker;