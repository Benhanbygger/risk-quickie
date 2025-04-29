// src/components/StockMetrics.jsx

import React, { useState } from "react";
import axios from "axios";

export default function StockMetrics() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/search?q=${value}&token=d010239r01qv3oh1rcfgd010239r01qv3oh1rcg0`
      );
      const filtered = response.data.result.filter(
        (item) => item.symbol && item.description
      );
      setSuggestions(filtered);
    } catch (err) {
      console.error("Error fetching ticker suggestions", err);
    }
  };

  const handleSelect = async (item) => {
    setSelected(item);
    setQuery(`${item.symbol} - ${item.description}`);
    setSuggestions([]);
    setLoading(true);
    setError("");
    setMetrics(null);

    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/stock/metric?symbol=${item.symbol}&metric=all&token=d010239r01qv3oh1rcfgd010239r01qv3oh1rcg0`
      );
      const m = res.data.metric;
      setMetrics({
        pe: m.peNormalizedAnnual,
        peg: m.pegAnnual,
        pb: m.pbAnnual,
        eps: m.epsNormalizedAnnual,
        roe: m.roeAnnual,
        revenueGrowth: m.revenueGrowthAnnual,
        forwardPe: m.forwardPeAnnual,
        dividendYield: m.dividendYieldIndicatedAnnual,
      });
    } catch (err) {
      console.error("Fejl ved hentning af nøgletal", err);
      setError("Kunne ikke hente nøgletal for denne ticker.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Vælg en aktie</h2>

      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Søg efter ticker eller virksomhed..."
        className="w-full p-3 border rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />

      {suggestions.length > 0 && (
        <ul className="border rounded-2xl mt-2 shadow bg-white max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.symbol}
              onClick={() => handleSelect(item)}
              className="p-3 hover:bg-blue-100 cursor-pointer"
            >
              <strong>{item.symbol}</strong> – {item.description}
            </li>
          ))}
        </ul>
      )}

      {loading && (
        <p className="mt-4 text-blue-600 text-center font-medium">Henter nøgletal...</p>
      )}

      {error && (
        <p className="mt-4 text-red-500 text-center font-medium">{error}</p>
      )}

      {metrics && (
        <div className="mt-6 space-y-2">
          <h3 className="text-xl font-semibold text-center mb-4">Nøgletal</h3>
          <ul className="space-y-1">
            <li><strong>P/E:</strong> {metrics.pe}</li>
            <li><strong>PEG:</strong> {metrics.peg}</li>
            <li><strong>P/B:</strong> {metrics.pb}</li>
            <li><strong>EPS:</strong> {metrics.eps}</li>
            <li><strong>ROE:</strong> {metrics.roe}</li>
            <li><strong>Revenue Growth:</strong> {metrics.revenueGrowth}%</li>
            <li><strong>Forward P/E:</strong> {metrics.forwardPe}</li>
            <li><strong>Dividend Yield:</strong> {metrics.dividendYield}%</li>
          </ul>
        </div>
      )}
    </div>
  );
}
