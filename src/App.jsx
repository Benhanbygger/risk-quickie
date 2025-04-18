import { useState, useEffect } from "react";

const API_KEY = "d010239r01qv3oh1rcfgd010239r01qv3oh1rcg0";

const felter = [
  {
    id: "pe",
    label: "P/E",
    autofill: true,
    forklaring: "P/E (Price/Earnings) viser hvor meget du betaler for 1 krones overskud. P/E under 15 anses ofte som lav og positivt."
  },
  {
    id: "peg",
    label: "PEG",
    autofill: false,
    forklaring: "PEG justerer P/E i forhold til vækst. Under 1 anses ofte som undervurderet."
  },
  {
    id: "eps",
    label: "EPS",
    autofill: true,
    forklaring: "EPS (Earnings Per Share) er overskud pr. aktie. Høj EPS = stærk indtjening."
  },
  {
    id: "dividend",
    label: "Direkte afkast (%)",
    autofill: true,
    forklaring: "Udbytte i % af kurs. 2–5 % er typisk godt. Meget højt udbytte kan være en advarsel."
  },
  {
    id: "revenue",
    label: "Omsætning",
    autofill: true,
    forklaring: "Virksomhedens samlede salg. Høj omsætning indikerer størrelse og markedsposition."
  },
  {
    id: "netIncome",
    label: "Resultat efter skat",
    autofill: true,
    forklaring: "Hvor meget virksomheden tjener efter skat. Skal helst være positivt og stabilt."
  },
  {
    id: "cashFlow",
    label: "Cash Flow",
    autofill: true,
    forklaring: "Pengestrømme fra drift. Positivt cash flow = virksomheden tjener rigtige penge."
  },
  {
    id: "equity",
    label: "Egenkapital",
    autofill: true,
    forklaring: "Virksomhedens værdi efter gæld. Positiv egenkapital er afgørende for soliditet."
  }
];

export default function App() {
  const [aktier, setAktier] = useState([
    {
      id: 1,
      ticker: "",
      currency: "USD",
      values: {},
      autoFilled: {},
      score: null,
      summary: "",
      color: "",
      comments: []
    }
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

    const [profile, metrics] = await Promise.all([
      fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${API_KEY}`).then(res => res.json()),
      fetch(`https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${API_KEY}`).then(res => res.json())
    ]);

    const newValues = {
      pe: metrics.metric.peNormalizedAnnual,
      eps: metrics.metric.epsNormalizedAnnual,
      dividend: metrics.metric.dividendYield,
      revenue: metrics.metric.revenuePerShareTTM,
      netIncome: metrics.metric.netIncomePerShareTTM,
      cashFlow: metrics.metric.freeCashFlowPerShareTTM,
      equity: metrics.metric.bookValuePerShareAnnual
    };

    const updated = [...aktier];
    updated[index].values = {
      ...updated[index].values,
      ...newValues
    };
    updated[index].autoFilled = Object.fromEntries(
      Object.entries(newValues).map(([k, v]) => [k, v !== null && v !== undefined])
    );
    updated[index].currency = profile.currency || "USD";
    setAktier(updated);
  };

  const calculateScore = (index) => {
    let s = 0;
    let comments = [];
    const v = aktier[index].values;

    if (v.pe < 15) {
      s += 2;
      comments.push("P/E under 15 indikerer lav pris ift. indtjening – positivt.");
    } else if (v.pe < 25) {
      s += 1;
    }

    if (v.peg < 1) {
      s += 2;
      comments.push("PEG under 1 tyder på attraktiv vækstværdi.");
    } else if (v.peg < 2) {
      s += 1;
    }

    if (v.eps > 0) {
      s += 2;
      comments.push("Positiv EPS viser overskud – godt tegn.");
    }

    if (v.dividend > 3) {
      s += 2;
      comments.push("Udbytte over 3 % kan være attraktivt for investorer.");
    } else if (v.dividend > 0) {
      s += 1;
    }

    if (v.revenue > 1000000000) {
      s += 2;
    } else if (v.revenue > 100000000) {
      s += 1;
    }

    if (v.netIncome > 0) s += 2;
    if (v.cashFlow > 0) s += 2;
    if (v.equity > 0) s += 2;

    const normalized = Math.round((s / 20) * 10);
    const updated = [...aktier];
    updated[index].score = normalized;
    updated[index].color = normalized <= 3 ? "green" : normalized <= 6 ? "orange" : "red";
    updated[index].summary =
      normalized <= 3
        ? "Lav risiko – stærke nøgletal"
        : normalized <= 6
        ? "Moderat risiko – OK fundament"
        : "Høj risiko – kræver grundig analyse";
    updated[index].comments = comments;
    setAktier(updated);
  };

  const tilføjAktie = () => {
    setAktier([
      ...aktier,
      {
        id: aktier.length + 1,
        ticker: "",
        currency: "USD",
        values: {},
        autoFilled: {},
        score: null,
        summary: "",
        color: "",
        comments: []
      }
    ]);
  };

  return (
    <div style={{ fontFamily: "Roboto, Open Sans, Verdana, sans-serif", padding: 20, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ background: "#f2f2f2", padding: 15, borderRadius: 10, marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>📊 Aktie Risikovurdering</h2>
        <p style={{ marginTop: 8 }}>
          Indtast en ticker for at hente live nøgletal og vurder aktiens risiko. Du kan sammenligne flere aktier ved at tilføje flere.
        </p>
      </div>

      {aktier.map((aktie, index) => (
        <div key={aktie.id} style={{ marginBottom: 30, padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
          <h3>Aktie #{index + 1}</h3>
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
            <button onClick={() => fetchData(index)}>Hent data</button>
          </div>

          {felter.map(({ id, label, autofill, forklaring }) => (
            <div key={id} style={{ marginBottom: 12 }}>
              <label
                onClick={() => toggleForklaring(index, id)}
                style={{ fontWeight: "bold", fontSize: 18, fontFamily: "Roboto", cursor: "pointer" }}
              >
                {label} ({aktie.currency}) <span style={{ color: "#000" }}>▼</span>
              </label>
              <input
                type="text"
                value={aktie.values[id] || ""}
                placeholder={!aktie.autoFilled[id] && autofill ? "please input manually" : ""}
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
                <div style={{ fontSize: 13, background: "#f9f9f9", padding: 8, borderRadius: 6, marginTop: 6 }}>
                  {forklaring}
                </div>
              )}
            </div>
          ))}

          <button onClick={() => calculateScore(index)} style={{ marginTop: 10 }}>
            Beregn risiko
          </button>

          {aktie.score !== null && (
            <div style={{ marginTop: 10, border: `2px solid ${aktie.color}`, padding: 10, borderRadius: 8 }}>
              <strong>Risikoscore:</strong> {aktie.score} / 10
              <br />
              <strong style={{ color: aktie.color }}>{aktie.summary}</strong>
              {aktie.comments.length > 0 && (
                <ul style={{ marginTop: 10 }}>
                  {aktie.comments.map((c, i) => (
                    <li key={i} style={{ fontSize: 13 }}>{c}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      ))}

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <button
          onClick={tilføjAktie}
          style={{
            padding: "10px 20px",
            background: "#007bff",
            color: "#fff",
            fontSize: "1rem",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          ➕ Tilføj aktie
        </button>
      </div>
    </div>
  );
}
