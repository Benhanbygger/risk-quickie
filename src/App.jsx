import { useState, useEffect } from 'react';

function App() {
  const [ticker, setTicker] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [inputs, setInputs] = useState({
    pe: '',
    eps: '',
    debtEquity: '',
    freeCashFlow: '',
    roe: '',
    revenueGrowth: '',
    profitMargin: '',
    equity: '',
    netIncome: '',
    stockPrice: '',
  });
  const [riskScore, setRiskScore] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const apiKey = import.meta.env.VITE_FINNHUB_API_KEY;

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (ticker.length < 1) return setSuggestions([]);
      try {
        const res = await fetch(
          `https://finnhub.io/api/v1/search?q=${ticker}&token=${apiKey}`
        );
        const data = await res.json();
        const filtered = data.result.filter((item) => item.type === 'Common Stock');
        setSuggestions(filtered.slice(0, 5));
      } catch (err) {
        console.error('Autocomplete error:', err);
      }
    };
    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [ticker, apiKey]);

  const handleSelectSuggestion = (symbol) => {
    setTicker(symbol);
    setSuggestions([]);
    fetchData(symbol);
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fetchData = async (symbol = ticker) => {
    if (!symbol) return alert("Please enter a ticker symbol.");

    // Finnhub først
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${apiKey}`
      );
      const data = await res.json();

      if (data.metric && Object.keys(data.metric).length > 0) {
        setInputs({
          pe: data.metric.peNormalizedAnnual ?? '',
          eps: data.metric.epsInclExtraItemsAnnual ?? '',
          debtEquity:
            data.metric.totalDebt && data.metric.totalEquity
              ? data.metric.totalDebt / data.metric.totalEquity
              : '',
          freeCashFlow: data.metric.freeCashFlowAnnual ?? '',
          roe: data.metric.roeAnnual ? data.metric.roeAnnual * 100 : '',
          revenueGrowth: data.metric.revenueGrowthTTMYoy
            ? data.metric.revenueGrowthTTMYoy * 100
            : '',
          profitMargin: data.metric.netProfitMarginAnnual
            ? data.metric.netProfitMarginAnnual * 100
            : '',
          equity: data.metric.totalEquity ?? '',
          netIncome: data.metric.netIncomeAnnual ?? '',
          stockPrice:
            data.metric.currentEv && data.metric.evToEbitda
              ? data.metric.currentEv / data.metric.evToEbitda
              : '',
        });
        setDataSource("Finnhub");
        return;
      }
    } catch (error) {
      console.error("Finnhub fetch failed:", error);
    }

    // Fallback til Yahoo Finance
    try {
      const res = await fetch(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=defaultKeyStatistics,financialData`);
      const json = await res.json();
      const stats = json.quoteSummary?.result?.[0];

      if (!stats) throw new Error("Yahoo returned no data");

      setInputs({
        pe: stats.defaultKeyStatistics?.trailingPE?.raw ?? '',
        eps: stats.defaultKeyStatistics?.trailingEps?.raw ?? '',
        roe: '', // Ikke tilgængeligt
        debtEquity: '',
        freeCashFlow: '',
        revenueGrowth: '',
        profitMargin: '',
        equity: '',
        netIncome: stats.financialData?.netIncomeToCommon?.raw ?? '',
        stockPrice: stats.financialData?.currentPrice?.raw ?? '',
      });
      setDataSource("Yahoo Finance");
    } catch (err) {
      console.error("Yahoo fallback failed:", err);
      alert("Kunne ikke hente data fra nogen kilde.");
    }
  };

  const calculateRisk = () => {
    let score = 5;
    if (Number(inputs.pe) < 15) score -= 1;
    if (Number(inputs.eps) > 2) score -= 1;
    if (Number(inputs.roe) > 10) score -= 1;
    if (Number(inputs.debtEquity) > 1) score += 1;
    if (Number(inputs.profitMargin) < 10) score += 1;
    score = Math.max(1, Math.min(10, score));
    setRiskScore(score);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Risk Quickie</h1>

      <div style={{ marginBottom: '1rem', position: 'relative' }}>
        <label>
          Stock Ticker:&nbsp;
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="e.g. AAPL"
            style={{ width: '150px' }}
          />
        </label>
        {suggestions.length > 0 && (
          <ul style={{
            position: 'absolute',
            top: '2.2rem',
            left: 0,
            background: '#fff',
            border: '1px solid #ccc',
            listStyle: 'none',
            padding: '0.5rem',
            width: '100%',
            zIndex: 10
          }}>
            {suggestions.map((sug) => (
              <li key={sug.symbol} style={{ padding: '0.3rem', cursor: 'pointer' }} onClick={() => handleSelectSuggestion(sug.symbol)}>
                {sug.symbol} — {sug.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {[
        ['P/E Ratio', 'pe'],
        ['EPS', 'eps'],
        ['Debt/Equity', 'debtEquity'],
        ['Free Cash Flow', 'freeCashFlow'],
        ['ROE (%)', 'roe'],
        ['Revenue Growth (%)', 'revenueGrowth'],
        ['Profit Margin (%)', 'profitMargin'],
        ['Equity (Book Value)', 'equity'],
        ['Net Income', 'netIncome'],
        ['Stock Price', 'stockPrice'],
      ].map(([label, name]) => (
        <div key={name} style={{ marginBottom: '1rem' }}>
          <label>
            {label}:&nbsp;
            <input
              type="number"
              name={name}
              value={inputs[name]}
              onChange={handleChange}
              placeholder="Enter value"
              style={{ width: '200px' }}
            />
          </label>
        </div>
      ))}

      <button onClick={calculateRisk} style={{ padding: '0.5rem 1rem', fontWeight: 'bold' }}>
        Calculate Risk
      </button>

      {riskScore && (
        <p style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
          📈 Risk Score: <strong>{riskScore}/10</strong>
        </p>
      )}

      {dataSource && (
        <p style={{ marginTop: '1rem', color: dataSource === 'Yahoo Finance' ? 'orange' : 'green' }}>
          {dataSource === 'Yahoo Finance'
            ? '⚠️ Data hentet fra alternativ kilde (Yahoo Finance)'
            : '✅ Data hentet fra Finnhub'}
        </p>
      )}
    </div>
  );
}

export default App;
