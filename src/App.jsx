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
  const [ticker, setTicker] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [values, setValues] = useState({});
  const [autoFilled, setAutoFilled] = useState({});
  const [score, setScore] = useState(null);
  const [summary, setSummary] = useState("");
  const [color, setColor] = useState("gray");

  const handleChange = (id, value) => {
    setValues({ ...values, [id]: value });
  };

  const fetchData = async () => {
    if (!ticker) return;

    const quoteRes = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${API_KEY}`);
    const profileRes = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`);
    const metricsRes = await fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${API_KEY}`);

    const [quote, profile, metrics] = await Promise.all([
      quoteRes.json(),
      profileRes.json(),
      metricsRes.json()
    ]);

    setCurrency(profile.currency || "USD");

    const newValues = {
      pe: metrics.metric.peNormalizedAnnual,
      eps: metrics.metric.epsNormalizedAnnual,
      dividend: metrics.metric.dividendYield,
      revenue: metrics.metric.revenuePerShareTTM,
      netIncome: metrics.metric.netIncomePerShareTTM,
      cashFlow: metrics.metric.freeCashFlowPerShareTTM,
      equity: metrics.metric.bookValuePerShareAnnual,
    };

    setValues({ ...values, ...newValues });
    setAutoFilled(Object.fromEntries(Object.keys(newValues).map(k => [k, true])));
  };

  const calculateScore = () => {
    let s = 0;
    const v = values;

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
    setScore(normalized);

    if (normalized <= 3) {
      setColor("green");
      setSummary("Lav risiko – stærke nøgletal");
    } else if (normalized <= 6) {
      setColor("orange");
      setSummary("Moderat risiko – OK fundament");
    } else {
      setColor("red");
      setSummary("Høj risiko – kræver grundig analyse");
    }
  };

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

      {felter.map(({ id, label, autofill }) => (
        <div key={id} style={{ marginBottom: 15 }}>
          <label htmlFor={id}>
            {label} ({currency})
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
