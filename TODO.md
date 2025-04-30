# 📋 TODO – Aktie Risikovurderingsapp

En struktureret oversigt over status og kommende udvikling i appen.

---

## ✅ Færdige funktioner (v1)

- [x] Live autofyld af nøgletal via Yahoo Finance
- [x] Automatisk fallback til Finnhub
- [x] Visning af valuta ved hvert felt
- [x] Dynamisk farvekodet risikoscore (1–10)
- [x] Konklusionstekst baseret på nøgletal
- [x] Forklarende tekster under hvert felt
  - 🔄 “Live data from Yahoo”
  - ♻️ “Fallback from Finnhub”
  - ⚠️ “Please input manually”
- [x] Forklaringsikoner og fold-ud funktion
- [x] Modern font (Roboto), responsivt layout
- [x] Beskrivelse i toppen af appen (foldet ud som standard)
- [x] Mulighed for at tilføje og sammenligne flere aktier
- [x] Automatisk visning af firmanavn i stedet for ticker
- [x] Placeholder-tekst i tomme felter
- [x] Intelligent ticker-søgning:
  - [x] Søger via ticker eller firmanavn
  - [x] Dropdown med forslag (Yahoo/Finnhub)
  - [x] Validering og fejlhåndtering
  - [x] Forbedret filtrering (viser fx nu korrekt NVO/Novo Nordisk)

---

## 🛠️ Igangværende (v2)

### 🔍 AI-kommentar (nøgletal)
- [x] Skabelonbaseret vurdering ud fra autofyldte data
- [ ] Udvidelse med tekstbaseret opsummering
- [ ] Kontekstuel kommentar afhængigt af score

### 📰 Nyhedsmodul
- [x] Marketaux API nøgle opsat
- [ ] Hente seneste nyheder baseret på ticker
- [ ] Vise resumé + dato og kilde i dansk format
- [ ] Gøre nyheder klar til AI-vurdering

---

## 📈 Udvikling i nøgletal (v2+)

- [x] Valgt: Victory Line Chart som standard
- [ ] Hente historiske data (5 år) for EPS, omsætning, nettoresultat, cash flow, egenkapital
- [ ] Visualisere i grafer (1 pr. nøgletal)
- [ ] Tooltip med årstal og enhed

---

## 💡 Planlagte idéer (v3 og frem)

- [ ] PDF-eksport eller "gem vurdering"-funktion
- [ ] Flersprogsfunktion (DK/EN)
- [ ] Brugerlogin og favoritaktier
- [ ] AI-vurdering med nyhedsopsummering og risikoanalyse
- [ ] Udvidet analyse: ESG, teknisk analyse, sektorbenchmark
- [ ] “Aktiescorekort” som samlet visning
- [ ] Mulig scraping/nyhedskildeintegration (f.eks. Euroinvestor – afventer tilladelse)

---

🧠 Sidst opdateret: 2025-04-30
