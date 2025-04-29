// src/App.jsx

import React from "react";
import StockMetrics from "./components/StockMetrics";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Risk-Quickie</h1>
        <p className="text-lg text-gray-600 mt-2">Find og vurder aktier lynhurtigt</p>
      </header>

      <main>
        <StockMetrics />
      </main>
    </div>
  );
}

export default App;
