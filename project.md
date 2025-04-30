
📄 Sidst opdateret: 2025-04-30

# 🧠 PROJECT – Risk-Quickie Aktie Risikovurderingsapp

En overordnet teknisk og funktionel beskrivelse af appen og dens formål.

---

## 🎯 Formål

Risk-Quickie er et browserbaseret værktøj til lynhurtig vurdering af enkeltaktier. Brugeren kan indtaste en aktie-ticker eller firmanavn og få en automatisk vurdering baseret på nøgletal, farvekodet risikoscore og forklarende tekster. Appen henvender sig til både begyndere og erfarne investorer, der ønsker et hurtigt overblik uden login, reklamer eller støj.

---

## 🔑 Nøglefunktioner

- Søgning via ticker eller firmanavn med intelligent dropdown
- Live autofyld af nøgletal via Yahoo Finance og fallback til Finnhub
- Dynamisk farvekodet risikoscore (1 = lav risiko, 10 = høj risiko)
- Konklusionstekst og forklaringer afhængigt af indtastede data
- AI-genereret vurdering (tekst) baseret på nøgletal
- Responsivt, minimalistisk design med moderne typografi (Roboto)
- Automatisk visning af selskabsnavn i stedet for ticker
- Visning og sammenligning af flere aktier
- Visualisering af historiske nøgletal (Victory Line Charts)
- Nyhedsmodul med seneste headlines og opsummering
- Klargjort til fremtidige features som eksport, login, ESG m.m.

---

## 🧱 Teknisk stack

- **Frontend**: React.js + TailwindCSS
- **API’er**:
  - Yahoo Finance (via RapidAPI) – primær datakilde
  - Finnhub – fallback datakilde
  - Marketaux – til nyhedsdata
- **Hosting**: Vercel
- **Versionsstyring**: Git + GitHub
- **Projektstyring**: TODO.md, PROJECT.md og PROGRESS.md
- **Designstil**: Minimalistisk, mobilvenligt, app-lignende oplevelse


---

## 🛡️ Brugersikkerhed

- Ingen login eller brugerkonto kræves
- Ingen tracking eller deling af data
- Data hentes kun i realtid fra officielle finansielle API'er

---

## 📍 Status

Appen er funktionel i sin grundstruktur og bruges aktivt til test. Udviklingen sker i faser og organiseres via TODO.md og PROGRESS.md. Næste mål: Hente og visualisere historiske nøgletal samt færdiggørelse af AI-modul og nyhedsopsummering.

---


# 📘 PROJECT.md – Risk Quickie – Projektbeskrivelse og Business Case

---

## 🧠 App-beskrivelse: Risk Quickie

Risk Quickie er et brugervenligt værktøj til lynhurtig vurdering af aktier – baseret på både nøgletal og nyhedsdata.  
Appen henter automatisk relevante finansielle nøgletal fra Yahoo Finance og Finnhub, og viser en intelligent vurdering af aktiens risiko på en skala fra 1 til 10 – suppleret med forklaringer og AI-genereret kommentar.

Appen skal gøre investeringsverdenen mere tilgængelig og gennemsigtig for private investorer – især kvinder over 40, som ønsker at tage kontrol over deres investeringer, men savner værktøjer der taler deres sprog.

Risk Quickie er ikke et værktøj der fortæller dig hvad du skal investere i – men det hjælper dig med hurtigt at få overblik over hvilke aktier der potentielt har lavest risiko.

---

## 🎯 Målgruppe

- Kvinder, 40+
- Bruger deres frie kapital og investerer via Nordnet, Saxo eller banken
- Værdsætter tryghed, transparens og overskuelighed i investeringsbeslutninger
- Ikke nødvendigvis eksperter – vil gerne lære, men har brug for et trygt udgangspunkt

---

## 🚀 Version 1 (MVP)

**Funktioner i første udgave:**

- Søgning på aktie (navn eller ticker)
- Indhentning af nøgletal fra Yahoo og Finnhub
- Visning af centrale metrics (PE, ROE, gæld, EPS, Beta, Cashflow etc.)
- Live autofyld af nøgletal
- Automatisk risiko score baseret på vægtede parametre
- Farvekodet score (1–10)
- AI-genereret vurdering ud fra tal og nyhedsdata
- AI-gennemgang af regnskabstal med styrker/svagheder
- AI-vurdering af nyhedsdata m. links og kilder
- Visning af nyheder med dato og kilde
- Dato for næste kvartalsregnskab
- Forklaringer ved alle nøgletal (tooltips)
- Grafer over udvikling i EPS, omsætning m.fl.
- Dropdown med ticker og firmanavn
- Mobilvenligt og responsivt design

---

## 📊 Nøgletal som hentes (eksempler)

- P/E, PEG, P/B, EV/EBITDA, EV/EBIT, P/S, P/FCF, Dividend Yield
- EPS, EPS Growth, ROE, ROA, ROI
- Gross Margin, Operating Margin, Net Margin
- Asset Turnover, Inventory Turnover, Receivables Turnover
- Operating Cash Flow Ratio
- Debt-to-Equity, Interest Coverage
- Current Ratio, Quick Ratio, Equity Ratio
- Revenue Growth, EBITDA Growth, Cash Flow Growth
- Forward P/E, Consensus Rating

---

## 🧾 Regnskabsdata (5 års historik)

- **Resultatopgørelse:** Omsætning, Omkostninger, Bruttoresultat, Driftsomkostninger, Driftsresultat, Resultat før/efter skat
- **Balance:** Anlægsaktiver, Omsætningsaktiver, Varelager, Egenkapital, Gæld
- **Cash Flow:** Drift, Investering, Finansiering

---

## 🌱 Version 2 – Fremtidige funktioner

- Sammenligning af aktier
- Mulighed for at gemme aktier og tracke udvikling
- Push notifikationer ved afvigelser (fx PE > 50)
- Bruger-login og personlige dashboards
- Udvidede grafer og datahistorik
- Internationalisering (sprog og marked)

---

## 🔌 Datakilder

### Gratis til MVP:

- Yahoo Finance (uofficiel quoteSummary)
- Finnhub.io (gratis op til 60/min)

### Betalte muligheder til senere:

- Alpha Vantage, IEX Cloud, Morningstar, Seeking Alpha, Twelve Data, TradingView API, Quandl

**Prisindikation:**

- Finnhub Pro: $49–199/måned
- Alpha Vantage Pro: Fra $29/måned
- IEX Cloud: Fra $9/måned
- Seeking Alpha API: Enterprise-niveau

---

## 💰 Monetiseringsmodeller

**Freemium:**

- Gratis version med basisdata og begrænset opslag (2–3 pr. døgn)
- Abonnement (29–59 kr./md)
- Alternativt engangskøb (49–99 kr.)
- Annoncer (Google AdMob)

**Affiliate-aftaler:**

- Nordnet, Saxo, eToro, analyseværktøjer m.fl.

---

## ⏳ Realistisk tidshorisont for V1

**Udgangspunkt: GPT-assistent, eksisterende React-setup.**

**Allerede implementeret:**

- Grundstruktur, søgning via Finnhub, live data, dropdown, GitHub+Vercel

**Manglende opgaver:**

- Dataudtræk (40+ nøgletal), AI-kommentarer, nyhedsanalyse, grafer, forklaringer, UI polish, fallback/logik

**Estimeret udviklingstid:**

| Fase                        | Estimat |
|----------------------------|---------|
| Udtræk & visning af nøgletal | 2–4 aftener |
| Risiko-score + UI            | 1–2 aftener |
| AI-kommentarer               | 2–3 aftener |
| Grafer + nyhedsvisning       | 2–3 aftener |
| Fallback & polish            | 2–3 aftener |
| Tests og debugging           | 2–3 aftener |

**Totalt:** 3–5 ugers deltidsarbejde

---

## 🚀 Pre-launch opgaver

### Monetiseringsstrategi

- Freemium vs abonnement
- Affiliate integration
- Annoncering

### Vækststrategi

- Go-to-market plan
- Skalering og internationalisering
- Budget og markedspotentiale

### Teknisk og marketing

- App Store rettigheder og hosting
- Rettigheder ift. datakilder
- UI design og markedsføring
- Navnevalg og målgruppeanalyse

---

## 🔚 Afsluttende bemærkning

Risk Quickie er skabt for at give brugeren tryghed og indsigt i en verden, der ellers kan føles eksklusiv og kompleks.  
Appen har potentiale til at blive en gateway til investering – med særligt fokus på en ofte overset målgruppe.  
Med en stærk frontend-struktur, skalerbare datakilder og en klar værdiforankring er Risk Quickie både en læringsplatform og et investeringsværktøj i ét.  
Med støtte fra partnere eller investorer er der mulighed for hurtig skalering og udrulning.



