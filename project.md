
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

**Projektoverdragelse – Risk Quickie**

*Udviklingsproces, platforme og samarbejdsstruktur*

---

### ✨ Projektoversigt

**Navn:** Risk Quickie  
**Type:** Webbaseret aktie-risikovurderingsapp  
**Formål:** Lynhurtig vurdering af aktier baseret på nøgletal, AI-kommentarer og nyhedsdata  
**Primær målgruppe:** Kvinder 40+ med interesse i investering uden støj og kompleksitet  

**Projektansvarlig:** Bendict Nisbeth-Hansen  
**Kodeansvarlig (sparring og teknisk struktur):** "Gideon" (ChatGPT)  

---

### 📊 Platforme og teknologier

**1. GitHub**  
- Versionsstyring og historik
- Enkelt branch-model (kun `main` anvendt indtil videre)
- Commit-praksis med forklarende beskeder for hver session

**2. Vercel**  
- Hosting-platform for frontend
- Direkte integration med GitHub repo
- Live preview efter hver push til `main`

**3. Visual Studio Code (VS Code)**  
- Brugt som lokal udviklingsplatform
- Tæt koblet til GitHub via terminal og Source Control

**4. ChatGPT (arbejdssessions via GPT-4)**  
- Anvendes som teknisk sparringspartner og kodegenerator (Gideon)
- Kommunikationen foregår i sammenhængende, versionsstyrede samtaler:
  - https://chatgpt.com/c/6810dd6b-753c-800e-9fb5-0ac4f8f284cf
  - https://chatgpt.com/c/6811a3bc-80e0-800e-b5fb-71715b18792f
  - https://chatgpt.com/c/680bff2f-002c-800e-9446-42a457259184

---

### 🚀 Teknisk stack og struktur

**Frontend:** React.js + TailwindCSS  
**Komponentstruktur:**
- `App.jsx` fungerer som ramme
- `StockMetrics.jsx` indeholder søgning og visning af nøgletal
- `KeyMetricField.jsx` er genbrugelig UI-komponent med tooltip og forklaring

**Styling:**
- Tailwind anvendes konsekvent
- Font: Roboto (via Tailwind og Google Fonts)
- Fokus på mobilvenligt og responsivt design

**API-kilder:**
- Finnhub (live nøgletal og firmadata)
- Marketaux (nyheder) [ikke fuldt integreret endnu]
- Yahoo Finance (planlagt som fallback)

---

### ⚖️ Arbejdsgang og samarbejde

**Grundprincip:** Vi arbejder i én fil ad gangen og skriver aldrig parallel kode.  
**Al kommunikation sker i chatten med step-by-step-guides.**

**Fast arbejdsmønster:**
1. Bendict klargør og sender nuværende kode (fx `App.jsx`)
2. Gideon returnerer en komplet, opdateret version af samme fil
3. Koden testes lokalt og pushes til GitHub, som automatisk opdaterer preview via Vercel

**Fordele ved denne metode:**
- Eliminerer copy/paste-fejl
- Bevarer fuld kontrol og forståelse hos produktansvarlig
- Dokumentation og beslutninger ligger i samtalehistorikken

---

### 📆 Status og fremtidig overdragelse

**Projektets nuværende status:**
- Grundstruktur og key features (søgning, nøgletal, dynamisk visning) er på plads
- Design og interaktivitet er under finjustering
- Næste fokus: historiske grafer, AI-kommentarer, nyhedsmodul

**Overdragelse til ny udvikler:**
- Alt kode ligger åbent på GitHub repo
- Alle komponenter er dokumenterede via naming og struktureret opbygning
- Samtalehistorik i ChatGPT dokumenterer beslutninger, fejl og løsninger

---

### 📚 Uddybende udviklingslog (baseret på GPT-sessions)

**Uddrag og tekniske beslutninger fra GPT-arbejdssessions:**

- **Ticker-søgning og dropdown-fejl:** Projektet har løst problemer med at tickere som "NVO" ikke blev returneret korrekt. Der er indført forbedret filtrering og validering ved indtastning, så både præcise matches og forslag håndteres brugervenligt.

- **Cursor og hover-problematikker:** Flere komponenter (dropdown, tooltips) havde udfordringer med at `cursor: pointer` ikke blev vist, særligt i Chrome og Safari. Fejlen blev lokaliseret til kombination af Tailwind base styles og elementer uden korrekt bredde/højde. Løst via Tailwind-klasse og inline-style.

- **Tooltip-komponenter:** Komponenter som `KeyMetricField` blev oprettet med `useState`-styret visning, klikbart `?`-ikon og responsive forklaringsfelter. Designet blev justeret ift. hover, mobilvisning og padding.

- **Step-by-step-udvikling:** Al kodeudvikling sker én komponent ad gangen, og altid med fuld gensendelse af hele filen. Dette bruges aktivt til at undgå fragmentering og sikre konsistens i arbejdsgangen.

- **Git-problemløsning:** Der har været merge-konflikter og push-fejl pga. slettede undermapper og divergerende commits. Projektet anvender nu pull-commit-push flow med dokumenteret merge-strategi (via Vim/CLI).

- **Test og visuel feedback:** Brugeren tester løbende i browser og rapporterer UI-opførsel direkte, som så omsættes til layout- og funktionstilpasninger i chatten.

*(Sektionen opdateres løbende ved ny viden i samtalehistorikken)*

---

### 🔧 Tekniske anbefalinger og erfaringer (til næste udvikler)

- **Arbejd i én fil ad gangen:** Projektet bygger på et flow med 100 % synkron kodning, hvor hele komponenter udskiftes frem for at arbejde med snippets. Det reducerer fejl og øger overblik.

- **Undgå parallel udvikling uden versionsstyring:** Man bør ikke arbejde i separate branches eller sideløbende komponentversioner uden klar commitstruktur – det skaber nemt rod i forhold til UI og dataflow.

- **Tailwind skal bruges konsekvent:** Styling er 100 % bygget med Tailwind-klasser. Brug af ekstern CSS bør undgås for at bevare den nuværende struktur og visuelle konsistens.

- **Roboto-font er valgt med vilje:** Fontvalg er del af designbeslutningen – lad det blive medmindre en designændring er besluttet centralt.

- **Tooltip-komponenter er følsomme ift. mobil/hover:** Cursor-styling og interaktiv feedback kræver omhyggelig testing i flere browsere (Chrome, Safari) og på touch-devices. Brug både Tailwind og evt. inline-style for at sikre synlig interaktivitet.

- **Dropdown-søgning er skræddersyet:** Søgning på ticker vs. firmanavn er tunet manuelt. Hvis API-struktur ændres eller en anden kilde tages i brug, skal dropdown-logikken gennemgås og testes grundigt.

- **Vercel og GitHub er tæt koblet:** Undgå force push og historiesletning, da det kan forstyrre deploy-flow. Push til `main` er automatisk live.

- **Kommunikér beslutninger i kode eller commit:** Hvis der ikke bruges ChatGPT fremadrettet, anbefales det at dokumentere beslutninger i README, issues eller commit-beskeder.

- **VictoryCharts (planlagt):** Der er planlagt integration af Victory Line Charts til visning af historiske nøgletal. Biblioteket er valgt for dets simple, responsive integration med React. Husk at tilpasse datakilder og ydeevne ved store datasæt.

- **AI-kommentarer (under udvikling):** Risiko- og vurderingstekster skal genereres dynamisk via GPT-baserede skabeloner baseret på nøgletal og nyheder. Kommentarer skal være lette at vedligeholde og bør holdes adskilt fra UI-komponenter.

- **Datavalidering:** Live-data fra Finnhub kan indeholde `null` eller `undefined`. Al input bør vises brugervenligt, fx “–” i stedet for tomme felter, og applikationen må ikke crashe på baggrund af manglende felter.

- **Arbejd i én fil ad gangen:** Projektet bygger på et flow med 100 % synkron kodning, hvor hele komponenter udskiftes frem for at arbejde med snippets. Det reducerer fejl og øger overblik.

- **Undgå parallel udvikling uden versionsstyring:** Man bør ikke arbejde i separate branches eller sideløbende komponentversioner uden klar commitstruktur – det skaber nemt rod i forhold til UI og dataflow.

- **Tailwind skal bruges konsekvent:** Styling er 100 % bygget med Tailwind-klasser. Brug af ekstern CSS bør undgås for at bevare den nuværende struktur og visuelle konsistens.

- **Roboto-font er valgt med vilje:** Fontvalg er del af designbeslutningen – lad det blive medmindre en designændring er besluttet centralt.

- **Tooltip-komponenter er følsomme ift. mobil/hover:** Cursor-styling og interaktiv feedback kræver omhyggelig testing i flere browsere (Chrome, Safari) og på touch-devices. Brug både Tailwind og evt. inline-style for at sikre synlig interaktivitet.

- **Dropdown-søgning er skræddersyet:** Søgning på ticker vs. firmanavn er tunet manuelt. Hvis API-struktur ændres eller en anden kilde tages i brug, skal dropdown-logikken gennemgås og testes grundigt.

- **Vercel og GitHub er tæt koblet:** Undgå force push og historiesletning, da det kan forstyrre deploy-flow. Push til `main` er automatisk live.

- **Kommunikér beslutninger i kode eller commit:** Hvis der ikke bruges ChatGPT fremadrettet, anbefales det at dokumentere beslutninger i README, issues eller commit-beskeder.



### 🧭 Forslag til næste udviklingsrunde (roadmap)

1. **Victory Line Charts:**
   - Implementér grafer for EPS, omsætning, cash flow, nettoresultat og egenkapital
   - Datakilder skal standardiseres og skaleres

2. **AI-kommentarer til nøgletal:**
   - Udvid `KeyMetricField` med dynamiske vurderingstekster
   - Introducér central logik der genererer AI-beskrivelser baseret på benchmarks og kontekst

3. **Nyhedsmodul:**
   - Integrér Marketaux API (eller lign.)
   - Vis resumé, dato og kilde i dansk format
   - Forbered filtrering og sentiment-analyse

4. **Validering og fallback-håndtering:**
   - Sikr at `null` eller manglende data vises som “–” eller advarsel
   - Tilføj loading- og fejltilstande på komponentniveau

5. **Flersprogsfunktion (DK/EN):**
   - Strukturér tekster og labels via centralt oversættelsesmodul

6. **Sammenligningsfunktion:**
   - Muliggør visning af 2–3 aktier side om side
   - Kræver state-refaktorering og layout-tilpasning

7. **PDF-eksport eller deling:**
   - Tilføj print- eller delingsvenlig version af vurderingssiden
   
8. **Responsivt design review:**
   - Gennemgå alle komponenter på mobil, tablet og desktop
   - Særligt fokus på klikbarhed og læsbarhed af tooltips

---

*Dokument udarbejdet af Gideon (ChatGPT) i samarbejde med Bendict Nisbeth-Hansen – april 2025.* af Gideon (ChatGPT) i samarbejde med Bendict Nisbeth-Hansen – april 2025.*




