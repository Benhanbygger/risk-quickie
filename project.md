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

📄 Sidst opdateret: 2025-04-30

---
Risk Quickie – Projektbeskrivelse og Business Case

App-beskrivelse: Risk Quickie
Risk Quickie er et brugervenligt værktøj til lynhurtig vurdering af aktier – baseret på både nøgletal og nyhedsdata.
Appen henter automatisk relevante finansielle nøgletal fra Yahoo Finance og Finnhub, og viser en intelligent vurdering af aktiens risiko på en skala fra 1 til 10 – suppleret med forklaringer og AI-genereret kommentar.
Appen skal gøre investeringsverdenen mere tilgængelig og gennemsigtig for private investorer – især kvinder over 40, som ønsker at tage kontrol over deres investeringer, men savner værktøjer der taler deres sprog.
Risk-Quickie er ikke et værktøj der fortæller dig hvad du skal investere i – men det hjælper dig med hurtigt at få overblik over hvilke aktier der potentielt har lavest risiko.

App-beskrivelse: Risk Quickie	0
Målgruppe	1
Version 1 (MVP)	2
Version 2 – Fremtidige funktioner	4
Datakilder (gratis & betalte)	5
Monetiseringsmodeller	6
Realistisk tidshorisont for V1 (til ære for Viktoria)	7
Pre launch opgaver	9
Da App’en er bygget med udgangspunktet i den er til eget brug, ligger der en del opgaver der skal estimeres og løses, hvis den skal udgives som en app.	9
● Monetiseringsstrategi	9
● Vækststrategi	9
○ Go-to-market strategi	9
○ Skaleringsstrategi	9
○ Market expansion plan	9
○ Internationaliseringsstrategi	9
Afsluttende bemærkning	10



Målgruppe
Kvinder, 40+


Bruger deres frie kapital og investerer via Nordnet, Saxo eller banken


Værdsætter tryghed, transparens og overskuelighed i investeringsbeslutninger


Ikke nødvendigvis eksperter – vil gerne lære, men har brug for et trygt udgangspunkt



Version 1 (MVP)
Funktioner i første udgave:
Søgning på aktie (navn eller ticker)


Indhentning af nøgletal fra Yahoo og Finnhub


Visning af centrale metrics (PE, ROE, gæld, EPS, Beta, Cashflow etc.)


Live autofyld af nøgletal (P/E, PEG, EPS, cash flow, mv.)


Automatisk risiko score baseret på vægtede parametre


Farvekodet score (1–10)


AI-genereret vurdering ud fra tal og nyhedsdata


AI-genereret forklaring på regnskabstal med fremhævelse af stærke/svage punkter


AI-gennemgang af nyhedsdata med kildeangivelse og links


AI tjek af virksomhedens egne forventninger vs markedets – konklusion vises


Visning af nyheder med dato og kilde


Dato for næste kvartalsregnskab


Forklaringer ved alle nøgletal (tooltips)


Grafer over udvikling i EPS, omsætning m.fl.


Dropdown med ticker og firmanavn


Mobilvenligt og responsivt design


Nøgletal som hentes (aktier):
P/E, PEG, P/B, EV/EBITDA, EV/EBIT, P/S, P/FCF, Dividend Yield


EPS, EPS Growth, ROE, ROA, ROI


Gross Margin, Operating Margin, Net Margin


Asset Turnover, Inventory Turnover, Receivables Turnover


Operating Cash Flow Ratio


Debt-to-Equity, Interest Coverage


Current Ratio, Quick Ratio, Equity Ratio


Revenue Growth, EBITDA Growth, Cash Flow Growth


Forward P/E, Consensus Rating


Regnskabsdata (5 års historik):
Omsætning, Omkostninger, Bruttoresultat


Driftsomkostninger, Driftsresultat


Resultat før/efter skat


Balance: Anlægsaktiver, Omsætningsaktiver, Varelager


Egenkapital, Lang/Kortfristet gæld, Gældsgrad


Cash flow: Drift, Investering, Finansiering



Version 2 – Fremtidige funktioner
Sammenligning af aktier


Mulighed for at gemme aktier og tracke udvikling


Push notifikationer (f.eks. hvis PE > 50 eller aktien falder >5%)


Bruger-login + personlige dashboards


Udvidede grafer og datahistorik


Internationalisering af platform



Datakilder (gratis & betalte)
Gratis til MVP (beta):
Yahoo Finance (uofficielt quoteSummary endpoint)


Finnhub.io (gratis op til 60/min, dog rate-limited)


Potentielle datakilder (ved V2/kommerciel app):
Alpha Vantage (gratis & Pro API)


IEX Cloud


Morningstar (mod betaling)


Seeking Alpha (mod betaling)


Twelve Data


TradingView API (graf-integration)


Quandl


API Prisindikationer:
Finnhub.io Pro: $49–199/måned


Alpha Vantage Pro: Fra $29/måned


IEX Cloud: Fra $9/måned, op til $99+ afhængig af brug


Seeking Alpha API: Efter forhandling (typisk enterprise)



Monetiseringsmodeller
Freemium-modul:


Gratis version med basisdata
Gratis version med 2-3 aktieopslag pr. døgn


Annoncer i gratis version (Google AdMob e.l.)


Abonnement (29–59 kr/md)


Alternativt Engangskøb i App Store (49–99 kr)


Affiliate aftaler:


Nordnet, Saxo, eToro etc.


Analyseplatforme (Seeking Alpha, TradingView)


Partnerskaber med aktie-nyhedsbreve







Realistisk tidshorisont for V1 (til ære for Viktoria)
Tidshorisonten er med udgangspunkt i, at jeg har en færdig bygget, trænet og top tunet GPT. Den er stadig under udarbejdelse
Jeg har allerede:
Grundstruktur i React


Søgning via Finnhub


Hentning og visning af basis-nøgletal


Dropdown med animation


JSON output med Yahoo fallback


GitHub + Vercel setup


⏳ Der mangler stadig:
Dataindsamling og strukturering af alle nævnte nøgletal (ca. 40 stk)


Intelligent risikovurderings-algoritme (1–10) med farvekodning


AI-kommentar genereret ud fra tal og nyhedsdata


Nyhedssøgning + AI-sammendrag (med kilde-link)


Grafer over regnskabstal


Forklarings-tekster til nøgletal


Responsivt layout og optimering til mobil


Fallback-håndtering, fejltolerans og loader states


Test + UI polish



Min arbejdsrytme: Jeg arbejder 3 aftener om ugen á cirka 5 timer – dvs. cirka 15 timer pr. uge.
Estimat – med mit tempo og fokus:

Fase
Tidsforbrug
Udtræk & visning af nøgletal
2–4 aftener
Risiko-score logik + UI
1–2 aftener
AI-kommentarer (regnskab/nyheder)
2–3 aftener
Grafer + nyhedsvisning
2–3 aftener
Forklaringer, fallback & UI
2–3 aftener
Tests, polish & debugging
2–3 aftener

Totalt: ca. 10–15 arbejdsdage svarende til 3–5 ugers udviklingstid, alt efter hvor effektivt og fokuseret jeg arbejder.

Pre launch opgaver
Da App’en er bygget med udgangspunktet i den er til eget brug, ligger der en del opgaver der skal estimeres og løses, hvis den skal udgives som en app. 
Monetiseringsstrategi
Abonnementsløsning
Gratis / betalt versionering
Affiliate aftaler
Annonceringsaftaler
Omsætningsprognose
Vækststrategi
Go-to-market strategi
Skaleringsstrategi
Market expansion plan
Internationaliseringsstrategi
Teknisk
Dev rettigheder til Appstore / gPlay
Server plads og hosting
Datakilder og begrænsninger
Rettigheder vedr. data
Driftsbudget
Målgruppe og marked
Trykprøve målgruppe
Markedsanalyse
Marketing
Navn på app
Design af UI
Marketing strategi
Budget

Afsluttende bemærkning
Risk Quickie er skabt for at give brugeren tryghed og indsigt i en verden, der ellers kan føles eksklusiv og kompleks. Appen har potentiale til at blive en gateway til investering – med særligt fokus på en ofte overset målgruppe.
Med en stærk frontend-struktur, skalerbare datakilder og en klar værdiforankring er Risk Quickie både en læringsplatform og et investeringsværktøj i ét. Med støtte fra partnere eller investorer er der mulighed for hurtig skalering og udrulning.


