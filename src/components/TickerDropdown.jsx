// src/components/TickerDropdown.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";

const FINNHUB_API_KEY = "d010239r01qv3oh1rcfgd010239r01qv3oh1rcg0";

export default function TickerDropdown() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelect = async (ticker) => {
    setSelected(ticker);
    setQuery(`${ticker.symbol} - ${ticker.description}`);
    setSuggestions([]);
    setQuote(null);

    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${ticker.symbol}&token=${FINNHUB_API_KEY}`
      );
      setQuote(res.data);
    } catch (err) {
      console.error("Kunne ikke hente aktiedata:", err);
      setQuote(null);
    }
  };

  useEffect(() => {
    if (query.length < 1) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `https://finnhub.io/api/v1/search?q=${query}&token=${FINNHUB_API_KEY}`
        );
        if (response.data.result) {
          const filtered = response.data.result.filter(
            (item) => item.symbol && item.description
          );
          setSuggestions(filtered);
        }
      } catch (err) {
        setError("Fejl ved hentning af tickere.");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-full max-w-md mx-auto mt-8">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Søg efter ticker eller virksomhed..."
        className="w-full p-3 border rounded-2xl shadow-sm focus:outline-none focus:ring focus:border-blue-300"
      />

      {loading && (
        <div className="absolute left-0 right-0 p-2 text-center text-gray-500 bg-white rounded-b-2xl shadow">
          Henter forslag...
        </div>
      )}

      {error && (
        <div className="absolute left-0 right-0 p-2 text-center text-red-500 bg-white rounded-b-2xl shadow">
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.symbol}
              onClick={() => handleSelect(item)}
              className="p-3 hover:bg-blue-100 cursor-pointer"
            >
              <span className="font-bold">{item.symbol}</span> - {item.description}
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">
            Valgt: {selected.symbol} ({selected.description})
          </p>

          {quote && (
            <div className="mt-2 text-sm text-gray-700">
              <p>Pris: ${quote.c}</p>
              <p>Dagens høj: ${quote.h} | lav: ${quote.l}</p>
              <p>Ændring: {quote.d} ({quote.dp}%)</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
