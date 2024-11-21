import React from 'react';
import CryptoPriceTracker from './components/CryptoPriceTracker';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center">
      <CryptoPriceTracker />
    </div>
  );
}

export default App;