// src/components/StockMetrics.jsx

import React, { useState } from "react";
import axios from "axios";
import KeyMetricField from "./KeyMetricField";

export default function StockMetrics() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [historicalData, setHistoricalData] = useState([]);

  const handleInputChange = async (e) => {
    const value = e.target.value.toUpperCase();
    setQuery(value);

    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/search?q=${value}&token=d010239r01qv3oh1rcfgd010239r01qv3oh1rcg0`
      );

      let filtered = response.data.result.filter(
        (item) => item.symbol && item.description
      );

      if (filtered.length > 0) {
        const exactMatches = filtered.filter(
          (item) => item.symbol.toUpperCase() === value
        );

        if (exactMatches.length > 0) {
          setSuggestions(exactMatches);
        } else {
          setSuggestions(filtered);
        }
      } else {
        setSuggestions([]);
      }
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
    setHistoricalData([]);

    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/stock/metric?symbol=${item.symbol}&metric=all&token=d010239r01qv3oh1rcfgd010239r01qv3oh1rcg0`
      );
      console.log("Finnhub metrics:", res.data.metric); // 👈 log data
      const m = res.data.metric;
      setMetrics({
        pe: m.peNormalizedAnnual,
        peg: m.pegAnnual,
        pb: m.pbAnnual,
        eps: m.epsNormalizedAnnual,
        roe: m.roeAnnual,
        revenueGrowth: m.revenueGrowthAnnual,
        forwardPe: m.forwardPeAnnual,
        dividendYield: m.dividendYieldIndicatedAnnual, // ikke gang med 100 her
      });

      await fetchHistoricalData(item.symbol);
    } catch (err) {
      console.error("Fejl ved hentning af nøgletal", err);
      setError("Kunne ikke hente nøgletal for denne ticker.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalData = async (symbol) => {
    const token = "d010239r01qv3oh1rcfgd010239r01qv3oh1rcg0";

    const endpoints = {
      income: `https://finnhub.io/api/v1/stock/financials?symbol=${symbol}&statement=income&freq=annual&token=${token}`,
      balance: `https://finnhub.io/api/v1/stock/financials?symbol=${symbol}&statement=balance&freq=annual&token=${token}`,
      cashflow: `https://finnhub.io/api/v1/stock/financials?symbol=${symbol}&statement=cash-flow&freq=annual&token=${token}`,
    };

    try {
      const [incomeRes, balanceRes, cashflowRes] = await Promise.all([
        axios.get(endpoints.income),
        axios.get(endpoints.balance),
        axios.get(endpoints.cashflow),
      ]);

      const years = incomeRes.data.data.slice(0, 5).map((entry) => entry.year);

      const mergedData = years.map((year) => {
        const income = incomeRes.data.data.find((d) => d.year === year) || {};
        const balance = balanceRes.data.data.find((d) => d.year === year) || {};
        const cash = cashflowRes.data.data.find((d) => d.year === year) || {};

        return {
          year,
          eps: income.eps,
          revenue: income.revenue,
          netIncome: income.netIncome,
          equity: balance.totalEquity,
          cashFlow: cash.cashFlowFromOperatingActivities,
        };
      });

      setHistoricalData(mergedData);
      console.log("Historiske data:", mergedData);
    } catch (err) {
      console.error("Fejl ved hentning af historiske nøgletal:", err);
      setHistoricalData([]);
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
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-semibold text-center mb-4">Nøgletal</h3>

          <KeyMetricField label="P/E" value={metrics.pe} explanation="Et lavt P/E-tal kan indikere at aktien er undervurderet – men det afhænger af branchen." />
          <KeyMetricField label="PEG" value={metrics.peg} explanation="En PEG-ratio på 1 eller mindre kan signalere, at aktiekursen er undervurderet." />
          <KeyMetricField label="P/B" value={metrics.pb} explanation="P/B måler aktiens pris i forhold til dens bogførte værdi. Under 1 kan indikere undervurdering." />
          <KeyMetricField label="EPS" value={metrics.eps} explanation="EPS viser hvor meget virksomheden tjener per aktie – jo højere, jo bedre." />
          <KeyMetricField label="ROE" value={metrics.roe} explanation="ROE viser hvor effektivt virksomheden skaber afkast til ejerne – højt er godt." />
          <KeyMetricField label="Revenue Growth" value={metrics.revenueGrowth != null ? `${(metrics.revenueGrowth * 100).toFixed(2)}%` : "–"} explanation="Viser vækst i omsætning år-over-år. Positiv vækst er ofte et godt tegn." />
          <KeyMetricField label="Forward P/E" value={metrics.forwardPe} explanation="Forward P/E vurderer aktien baseret på forventet indtjening – nyttigt til fremsynede vurderinger." />
          <KeyMetricField label="Dividend Yield" value={metrics.dividendYield != null ? `${metrics.dividendYield.toFixed(2)}%` : "–"} explanation="Hvor stor en procentdel af aktiekursen udbetales som udbytte – vigtigt for udbytteinvestorer." />
        </div>
      )}

      {historicalData.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Seneste 5 års data:</h3>
          <ul className="text-sm space-y-1">
            {historicalData.map((yearData) => (
              <li key={yearData.year}>
                <strong>{yearData.year}</strong>: EPS {yearData.eps}, Revenue {yearData.revenue}, Net Income {yearData.netIncome}, Cash Flow {yearData.cashFlow}, Equity {yearData.equity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
