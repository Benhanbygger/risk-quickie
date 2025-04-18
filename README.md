# 📊 Risk-Quickie

Risk-Quickie er et brugervenligt værktøj til lynhurtig vurdering af aktier – baseret på både nøgletal og nyhedsdata.

Appen henter automatisk relevante finansielle nøgletal fra Yahoo Finance og Finnhub, og viser en intelligent vurdering af aktiens risiko på en skala fra 1 til 10 – suppleret med forklaringer og AI-genereret kommentar.

---

## 🚀 Funktioner

- 🔎 Søg efter aktier med både ticker og firmanavn
- 📈 Live autofyld af nøgletal (P/E, PEG, EPS, cash flow, mv.)
- 💡 Intelligent risikovurdering med farvekodet score (1–10)
- 📉 AI-genereret vurdering ud fra tal og nyhedsdata
- 🗓 Visning af nyheder med dato og kilde
- 🧠 Forklaringer ved alle nøgletal
- 📊 Grafer over udvikling i EPS, omsætning m.fl.
- 🌐 Mobilvenligt og responsivt design

---

## ⚙️ Teknisk opsætning

### Krav:
- Node.js (v18 eller nyere anbefales)
- npm eller yarn
- Vite
- React

### Kom i gang:

```bash
git clone https://github.com/Benhanbygger/risk-quickie.git
cd risk-quickie
npm install
npm run dev

---

## 🔐 API-adgang

Du skal oprette følgende API-nøgler og placere dem i en `.env`-fil i roden af projektet:

```env
VITE_YAHOO_API_KEY=din_yahoo_nøgle
VITE_FINNHUB_API_KEY=4BTEIMDONRBI7XJ5
VITE_MARKETAUX_API_KEY=bW8KZvKDF1bzkpVK11SNEuCece92OOVp1Fmf5OdX

---

## 🔐 Brugte API'er:

🟡 **Yahoo Finance via RapidAPI**  
→ Bruges til autofuldførelse og nøgletal  
🔗 https://rapidapi.com/apidojo/api/yahoo-finance1/

🔵 **Finnhub.io**  
→ Bruges til backup af nøgletal og valutainfo  
🔗 https://finnhub.io

🟣 **Marketaux News API**  
→ Bruges til at hente nyheder og artikler om aktier  
🔗 https://www.marketaux.com

---

## 🧪 Brugervejledning

1. Indtast et firmanavn eller ticker
2. Vælg aktien fra listen i dropdown
3. Appen henter automatisk nøgletal og nyheder
4. Du får en farvekodet risikoscore (1–10)
5. Læs AI-genereret kommentar baseret på nøgletal
6. Sammenlign flere aktier side om side
7. Se relevante nyheder med dato og kilde

---

## 🔮 Kommende funktioner

- 📄 PDF-eksport af vurdering
- ⭐ Favoritaktier og brugerlogin
- 🧠 Fuldt AI-sammendrag af nyhedsdata
- 📊 Udvidet analyse: ESG, teknisk, sektormæssig
- 🌍 Flersprogsfunktion (DK/EN)
- 📈 Flere grafer og nøgletal over tid
---

## 🔐 Brugte API'er:

🟡 **Yahoo Finance via RapidAPI**  
→ Bruges til autofuldførelse og nøgletal  
🔗 https://rapidapi.com/apidojo/api/yahoo-finance1/

🔵 **Finnhub.io**  
→ Bruges til backup af nøgletal og valutainfo  
🔗 https://finnhub.io

🟣 **Marketaux News API**  
→ Bruges til at hente nyheder og artikler om aktier  
🔗 https://www.marketaux.com

---

## 🧪 Brugervejledning

1. Indtast et firmanavn eller ticker
2. Vælg aktien fra listen i dropdown
3. Appen henter automatisk nøgletal og nyheder
4. Du får en farvekodet risikoscore (1–10)
5. Læs AI-genereret kommentar baseret på nøgletal
6. Sammenlign flere aktier side om side
7. Se relevante nyheder med dato og kilde

---

## 🔮 Kommende funktioner

- 📄 PDF-eksport af vurdering
- ⭐ Favoritaktier og brugerlogin
- 🧠 Fuldt AI-sammendrag af nyhedsdata
- 📊 Udvidet analyse: ESG, teknisk, sektormæssig
- 🌍 Flersprogsfunktion (DK/EN)
- 📈 Flere grafer og nøgletal over tid

