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

## 📦 Filstruktur (udsnit)

