import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [coins, setCoins] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error');
        }
        return response.json();
      })
      .then((data) => {
        setCoins(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleCoinClick = (id) => {
    navigate(`/coin/${id}`);
  };

  return (
    <div>
      <h1>Home - Cripto Monedas</h1>
      <ul>
        {coins.map((coin) => (
          <li 
            key={coin.id} 
            onClick={() => handleCoinClick(coin.id)}
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline', marginBottom: '8px' }}
          >
            {coin.name} ({coin.symbol.toUpperCase()})
          </li>
        ))}
      </ul>
    </div>
  );
};