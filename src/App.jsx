import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState(null);
  const wrapperRef = useRef(null);

  const FINNHUB_API_KEY = "d010239r01qv3oh1rcfgd010239r01qv3oh1rcg0";

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/search?q=${value}&token=${FINNHUB_API_KEY}`
        );
        const result = await response.json();
        if (result.result) {
          const filtered = result.result.filter(
            (item) => item.type === "Common Stock" || item.type === "Equity"
          );
          setSearchResults(filtered);
          setShowDropdown(filtered.length > 0);
        } else {
          setSearchResults([]);
          setShowDropdown(false);
        }
      } catch (err) {
        console.error("Søgefejl:", err);
        setSearchResults([]);
        setShowDropdown(false);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (item) => {
    setQuery(`${item.description}`);
    setTicker(item.symbol);
    setShowDropdown(false);
    fetchStockData(item.symbol);
  };

  const fetchStockData = async (symbol) => {
    try {
      const yahooResponse = await fetch(
        `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=financialData,defaultKeyStatistics,summaryDetail`
      );
      const yahooJson = await yahooResponse.json();
      if (yahooJson.quoteSummary.result) {
        setData(yahooJson.quoteSummary.result[0]);
      } else {
        const finnhubResponse = await fetch(
          `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${FINNHUB_API_KEY}`
        );
        const finnhubJson = await finnhubResponse.json();
        setData(finnhubJson.metric);
      }
    } catch (error) {
      console.error("Fejl ved hentning af nøgletal:", error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Risk Quickie</h1>
      <div className="relative mb-4" ref={wrapperRef}>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Søg aktie: f.eks. 'Novo Nordisk' eller 'NVO'"
          value={query}
          onChange={handleSearch}
          onFocus={() => setShowDropdown(searchResults.length > 0)}
        />
        <AnimatePresence>
          {showDropdown && (
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full max-h-60 overflow-y-auto z-10 rounded-md shadow-lg mt-1 bg-[#ededed] border border-gray-300"
            >
              {searchResults.map((item, index) => (
                <li
                  key={index}
                  className="p-2 text-sm cursor-pointer transition-colors hover:bg-[#84a112]"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(item);
                  }}
                >
                  ({item.symbol}) {item.description}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {data ? (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Data for: {ticker}</h2>
          <pre className="text-sm overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        ticker && <p>Indlæser nøgletal for {ticker}...</p>
      )}
    </div>
  );
};

export default App;
