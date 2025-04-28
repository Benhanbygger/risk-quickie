// src/App.jsx

import React from "react";
import TickerDropdown from "./components/TickerDropdown";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Risk-Quickie</h1>
        <p className="text-lg text-gray-600 mt-2">Find og analyser aktier hurtigt</p>
      </header>

      <main className="flex flex-col items-center">
        <TickerDropdown />
      </main>
    </div>
  );
}

export default App;
