// src/App.jsx

import React, { useEffect } from "react";
import StockMetrics from "./components/StockMetrics";

function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      a, a * {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Risk-Quickie</h1>
        <p className="text-lg text-gray-600 mt-2">
          Find og vurder aktier lynhurtigt{" "}
          <a href="https://www.example.com" className="text-blue-600 underline">
            Prøv her
          </a>
        </p>
      </header>

      <main>
        <StockMetrics />
      </main>
    </div>
  );
}

export default App;
