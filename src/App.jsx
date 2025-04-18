import { useState } from "react";

const felter = [
  {
    id: "pe",
    label: "P/E",
    autofill: true,
    forklaring:
      "P/E (Price/Earnings) viser hvor meget du betaler for 1 krones overskud. Under 15 er ofte godt."
  },
  {
    id: "peg",
    label: "PEG",
    autofill: false,
    forklaring:
      "PEG justerer P/E i forhold til vækst. Under 1 anses ofte som undervurderet."
  },
  {
    id: "eps",
    label: "EPS",
    autofill: true,
    forklaring:
      "EPS (Earnings Per Share) er overskud pr. aktie. Høj EPS = stærk indtjening."
  },
  {
    id: "dividend",
    label: "Direkte afkast (%)",
    autofill: true,
    forklaring:
      "Udbytte i % af kurs. 2–5 % er typisk godt. Meget højt udbytte kan være en advarsel."
  },
  {
    id: "revenue",
    label: "Omsætning",
    autofill: true,
    forklaring:
      "Virksomhedens totale salg. Høj omsætning indikerer størrelse og markedsposition."
  },
  {
    id: "netIncome",
    label: "Resultat efter skat",
    autofill: true,
    forklaring:
      "Hvor meget virksomheden tjener efter skat. Skal helst være positivt og stabilt."
  },
  {
    id: "cashFlow",
    label: "Cash Flow",
    autofill: true,
    forklaring:
      "Pengestrømme fra drift. Positivt cash flow = virksomheden tjener rigtige penge."
  },
  {
    id: "equity",
    label: "Egenkapital",
    autofill: true,
    forklaring:
      "Virksomhedens værdi efter gæld. Positiv egenkapital er afgørende for soliditet."
  }
];


const API_KEY = "d010239r01qv3oh1rcfgd010239r01qv3oh1rcg0";

export default function App() {
  const [aktier, setAktier] = useState([
    { id: 1, ticker: "", currency: "USD", values: {}, autoFilled: {}, score: null, summary: "", color: "" }
  ]);

  const handleChange = (index, id, value) => {
    const updated = [...aktier];
    updated[index].values[id] = value;
    setAktier(updated);
  };

  const toggleForklaring = (index, id) => {
    const updated = [...aktier];
    updated[index].values[`show_${id}`] = !updated[index].values[`show_${id}`];
    setAktier(updated);
  };

  const fetchData = async (index) => {
    const ticker = aktier[index].ticker;
    if (!ticker) return;

    const [quote, profile, metrics] = await Promise.all([
      fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`).then(res => res.json()),
      fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`).then(res => res.json()),
      fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${API_KEY}`).then(res => res.json()),
    ]);

    const newValues = {
      pe: metrics.metric.peNormalizedAnnual,
      eps: metrics.metric.epsNormalizedAnnual,
      dividend: metrics.metric.dividendYield,
      revenue: metrics.metric.revenuePerShareTTM,
      netIncome: metrics.metric.netIncomePerShareTTM,
      cashFlow: metrics.metric.freeCashFlowPerShareTTM,
      equity: metrics.metric.bookValuePerShareAnnual,
    };

    const updated = [...aktier];
    updated[index].values = { ...updated[index].values, ...newValues };
    updated[index].autoFilled = Object.fromEntries(Object.keys(newValues).map(k => [k, true]));
    updated[index].currency = profile.currency || "USD";
    setAktier(updated);
  };

  const calculateScore = (index) => {
    let s = 0;
    const v = aktier[index].values;

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

    const updated = [...aktier];
    updated[index].score = normalized;
    updated[index].color =
      normalized <= 3 ? "green" : normalized <= 6 ? "orange" : "red";
    updated[index].summary =
      normalized <= 3
        ? "Lav risiko – stærke nøgletal"
        : normalized <= 6
        ? "Moderat risiko – OK fundament"
        : "Høj risiko – kræver grundig analyse";

    setAktier(updated);
  };

  const tilføjAktie = () => {
    const ny = {
      id: aktier.length + 1,
      ticker: "",
      currency: "USD",
      values: {},
      autoFilled: {},
      score: null,
      summary: "",
      color: ""
    };
    setAktier([...aktier, ny]);
  };

 return (
  <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
    <h1 style={{ fontSize: "1.8rem", marginBottom: 20 }}>Sammenlign aktier</h1>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: 20,
      }}
    >
      {aktier.map((aktie, index) => (
        <div
          key={aktie.id}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: 10,
            padding: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Aktie #{index + 1}</h3>

          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <input
              placeholder="Ticker (fx AAPL)"
              value={aktie.ticker}
              onChange={(e) => {
                const updated = [...aktier];
                updated[index].ticker = e.target.value;
                setAktier(updated);
              }}
              style={{ flex: 1, padding: 6 }}
            />
            <button onClick={() => fetchData(index)}>Hent</button>
          </div>

          {felter.map(({ id, label, autofill, forklaring }) => (
            <div key={id} style={{ marginBottom: 10 }}>
              <label>
                {label} ({aktie.currency}){" "}
                <span
                  style={{ cursor: "pointer", color: "#007bff" }}
                  onClick={() => toggleForklaring(index, id)}
                  title="Vis forklaring"
                >
                  ❓
                </span>
              </label>
              <input
                type="text"
                value={aktie.values[id] || ""}
                onChange={(e) => handleChange(index, id, e.target.value)}
                style={{ width: "100%", padding: 6, marginTop: 4 }}
              />
              <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
                {aktie.autoFilled[id]
                  ? "🔄 Live data from Finnhub"
                  : autofill
                  ? "⚠️ Live data not available – please fill out manually"
                  : ""}
              </div>
              {aktie.values[`show_${id}`] && (
                <div
                  style={{
                    fontSize: 13,
                    color: "#444",
                    marginTop: 6,
                    background: "#f9f9f9",
                    padding: 8,
                    borderRadius: 4,
                  }}
                >
                  {forklaring}
                </div>
              )}
            </div>
          ))}

          <button
            onClick={() => calculateScore(index)}
            style={{
              marginTop: 10,
              padding: "8px 12px",
              background: "#eee",
              border: "1px solid #ccc",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Beregn risiko
          </button>

          {aktie.score !== null && (
            <div
              style={{
                marginTop: 10,
                padding: 10,
                border: `2px solid ${aktie.color}`,
                borderRadius: 6,
                background: "#fefefe",
              }}
            >
              <strong>Risikoscore:</strong> {aktie.score} / 10
              <br />
              <strong style={{ color: aktie.color }}>{aktie.summary}</strong>
            </div>
          )}
        </div>
      ))}
    </div>

    <div style={{ marginTop: 30, textAlign: "center" }}>
      <button
        onClick={tilføjAktie}
        style={{
          background: "#007bff",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: 8,
          fontSize: "1rem",
          border: "none",
          cursor: "pointer",
        }}
      >
        ➕ Tilføj aktie
      </button>
    </div>
  </div>
);



  

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h1>Risikovurdering af aktie</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Ticker (fx AAPL)"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
        />
        <button onClick={fetchData}>Hent data</button>
      </div>

     {felter.map(({ id, label, autofill, forklaring }) => (
  <div key={id} style={{ marginBottom: 15 }}>
    <label htmlFor={id}>
      {label} ({currency}){" "}
      <span
        style={{ cursor: "pointer", color: "#007bff" }}
        onClick={() =>
          setValues((prev) => ({
            ...prev,
            [`show_${id}`]: !prev[`show_${id}`],
          }))
        }
        title="Vis forklaring"
      >
        ❓
      </span>
    </label>
    <input
      id={id}
      type="text"
      value={values[id] || ""}
      onChange={(e) => handleChange(id, e.target.value)}
      style={{ width: "100%", padding: 6, marginTop: 4 }}
    />
    <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
      {autoFilled[id]
        ? "🔄 Live data from Finnhub"
        : autofill
        ? "⚠️ Live data not available – please fill out manually"
        : ""}
    </div>
    {values[`show_${id}`] && (
      <div style={{ fontSize: 13, color: "#444", marginTop: 6, background: "#f9f9f9", padding: 8, borderRadius: 4 }}>
        {forklaring}
      </div>
    )}
  </div>
))}


      <button onClick={calculateScore} style={{ marginTop: 20 }}>
        Beregn risiko
      </button>

      {score !== null && (
        <div style={{ marginTop: 20, padding: 10, border: `2px solid ${color}` }}>
          <strong>Risikoscore:</strong> {score} / 10
          <br />
          <strong style={{ color }}>{summary}</strong>
        </div>
      )}
    </div>
  );
}
