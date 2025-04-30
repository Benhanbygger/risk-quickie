# 📈 PROGRESS – Udviklingslog for Risk-Quickie

Denne fil dokumenterer milepæle og tekniske beslutninger under udviklingen af Risk-Quickie.

---

## 🟢 2025-04-28 – Version 1 Uploadet

- Første version af appen lagt på GitHub og Vercel
- Grundlæggende søgefunktion og manuelle nøgletal indført
- Setup med TailwindCSS, Roboto-font og moderne layout
- App struktureret med komponenter og state management i React

---

## 🟢 2025-04-29 – Ticker-søgning og data-autofill

- Integreret live ticker-søgning via Finnhub
- Dropdown med forslag, fejlhåndtering og responsivt input
- Automatisk datahentning for P/E, PEG, P/B, EPS, ROE, Revenue Growth m.m.
- Håndtering af loading state og fejlmeddelelser
- Forbedret UX med visning af firmabeskrivelse og symbol
- Introduktion af Victory Line Chart (ikke aktiveret endnu)
- Cursor-stil sat til `pointer` ved hover over forslag

---

## 🔧 2025-04-30 – Konsolidering og dokumentation

- Fastlagt arbejdsstruktur med GitHub + VS Code synkronisering
- Oprettet og struktureret `TODO.md`, `PROJECT.md`, `PROGRESS.md`
- Besluttet at dele udviklingen op i sessions-baserede logfiler
- Enighed om kun at arbejde i én fil ad gangen og aldrig parallel kode
- Fokus flyttet til næste større modul: Historiske nøgletal og grafer

---

## 📎 Næste trin (prioritet)

1. Implementere historiske nøgletal via Finnhub til grafer
2. Gøre grafer interaktive med tooltip og årstal
3. Integrere nyhedsmodul med opsummering
4. Forfine AI-kommentar ud fra score og data

---

🔁 Opdateres efter hver udviklingssession
📄 Sidst opdateret: 2025-04-30
