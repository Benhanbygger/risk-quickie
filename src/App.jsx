import React, { useState } from "react";
import axios from "axios";

const apiKeys = {
  finnhub: import.meta.env.VITE_FINNHUB_API_KEY,
  marketaux: import.meta.env.VITE_MARKETAUX_API_KEY,
};

const App = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [aktier, setAktier] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length < 2) return setSuggestions([]);

    try {
      const res = await axios.get(
        `https://finnhub.io/api/v1/search?q=${value}&token=${apiKeys.finnhub}`
      );
      const results = res.data.result.filter((item) => item.symbol && item.description);
      setSuggestions(results.slice(0, 5));
    } catch (error) {
      console.error("Fejl i Finnhub autosuggest:", error);
      setSuggestions([]);
    }
  };

  const addAktie = async (item) => {
    setSearch("");
    setSuggestions([]);
    const ticker = item.symbol;
    const name = item.description;

    const newAktie = {
      ticker,
      name,
      values: {
        pe: "",
        peg: "",
        eps: "",
        dividend: "",
        revenue: "",
        netIncome: "",
        cashFlow: "",
        equity: "",
      },
      labels: {},
      score: null,
      color: "",
      summary: "",
    };

    const updated = [...aktier, newAktie];
    setAktier(updated);
    await fetchData(updated.length - 1, ticker);
  };

  const fetchData = async (index, ticker) => {
    const updated = [...aktier];
    const aktie = updated[index];

    try {
      const fallback = await axios.get(
        `https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${apiKeys.finnhub}`
      );
      const d = fallback.data.metric;
      aktie.values.pe = d.peNormalizedAnnual ?? "";
      aktie.values.peg = d.pegAnnual ?? "";
      aktie.values.eps = d.epsInclExtraItemsAnnual ?? "";
      aktie.values.dividend = d.dividendYieldIndicatedAnnual ?? "";
      aktie.currency = "USD";

      aktie.labels.pe = d.peNormalizedAnnual ? "Live data from Finnhub" : "Please input manually";
      aktie.labels.peg = d.pegAnnual ? "Live data from Finnhub" : "Please input manually";
      aktie.labels.eps = d.epsInclExtraItemsAnnual ? "Live data from Finnhub" : "Please input manually";
      aktie.labels.dividend = d.dividendYieldIndicatedAnnual ? "Live data from Finnhub" : "Please input manually";
    } catch (e) {
      console.error("Datakilder fejlede", e);
    }

    calculateScore(index, updated);
  };

  const calculateScore = (index, updatedList = aktier) => {
    let s = 0;
    const v = updatedList[index].values;

    if (v.pe < 15) s += 2;
    else if (v.pe < 25) s += 1;

    if (v.peg < 1) s += 2;
    else if (v.peg < 2) s += 1;

    if (v.eps > 0) s += 2;
    if (v.dividend > 3) s += 2;
    else if (v.dividend > 0) s += 1;

    if (v.revenue > 1000000000) s += 2;
    else if (v.revenue > 100000000) s += 1;

    if (v.netIncome > 0) s += 2;
    if (v.cashFlow > 0) s += 2;
    if (v.equity > 0) s += 2;

    const normalized = Math.round((s / 20) * 10);
    updatedList[index].score = normalized;
    updatedList[index].color =
      normalized <= 3 ? "green" : normalized <= 6 ? "orange" : "red";
    updatedList[index].summary =
      normalized <= 3
        ? "Lav risiko – stærke nøgletal"
        : normalized <= 6
        ? "Moderat risiko – OK fundament"
        : "Høj risiko – kræver grundig analyse";

    setAktier([...updatedList]);
  };

  return (
    <div style={{ fontFamily: "Roboto, sans-serif", padding: "2rem" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "1rem" }}>📊 Aktie Risikovurdering</h1>
      <p style={{ marginBottom: "1rem" }}>
        Indtast en aktie (ticker eller navn) og få automatisk vurdering af risiko baseret på nøgletal.
      </p>

      <input
        type="text"
        placeholder="Søg aktie (f.eks. Novo Nordisk eller NVO)"
        value={search}
        onChange={handleSearch}
        style={{
          padding: "0.5rem",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "0.5rem",
        }}
      />

      <button
        onClick={() => {
          if (suggestions.length > 0) {
            addAktie(suggestions[0]);
          } else {
            alert("Ingen gyldige forslag – prøv at skrive mere præcist");
          }
        }}
        style={{
          padding: "0.5rem 1rem",
          marginTop: "0.5rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Tilføj aktie
      </button>

      {suggestions.length > 0 && (
        <div style={{ border: "1px solid #ccc", maxWidth: "400px", background: "#fff" }}>
          {suggestions.map((item) => (
            <div
              key={item.symbol}
              onClick={() => addAktie(item)}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.description} – <strong>{item.symbol}</strong>
            </div>
          ))}
        </div>
      )}

      {aktier.map((aktie, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "20px", marginBottom: "0.5rem" }}>
            {aktie.name} ({aktie.ticker}) – {aktie.currency}
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {Object.entries(aktie.values).map(([key, value]) => (
              <div key={key}>
                <label style={{ fontWeight: "bold", fontSize: "18px" }}>{key.toUpperCase()}</label>
                <input
                  type="number"
                  placeholder="please input manually"
                  value={value}
                  onChange={(e) => {
                    const updated = [...aktier];
                    updated[index].values[key] = parseFloat(e.target.value);
                    setAktier(updated);
                    calculateScore(index, updated);
                  }}
                  style={{ width: "100%", padding: "0.25rem", marginTop: "0.25rem" }}
                />
                <div style={{ fontSize: "12px", color: "#666", marginTop: "0.25rem" }}>
                  {aktie.labels[key]}
                </div>
              </div>
            ))}
          </div>

          {aktie.score !== null && (
            <div style={{ marginTop: "1rem" }}>
              <p>
                <strong>Risikovurdering:</strong>{" "}
                <span style={{ color: aktie.color }}>
                  {aktie.score} / 10
                </span>
              </p>
              <p>{aktie.summary}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
