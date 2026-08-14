# FinTrust Capital — web (návrh ke schválení)

Druhý web skupiny FinTrust — **nebankovní financování proti zástavě**.
Design systém převzatý **1:1 z webu FinTrust Reality** (stejné fonty, barvy, tlačítka,
karty, spacing). Draft ke schválení s klientem — bez napojení na backend.

## Klíčový princip
**Nejsme banka — vše jde přes osobního poradce.** Žádné online schválení naslepo.
Každá poptávka vede na kontakt s poradcem. Promítnuto do textů, CTA i procesu.

## Spuštění lokálního náhledu
Ve složce `site/`:
```bash
python3 -m http.server 8081
```
Otevřete **http://localhost:8081**.

## Struktura
| Stránka | Soubor |
|---|---|
| Domů (one-page) | `index.html` |
| Zástava nemovitosti | `zastava-nemovitosti.html` |
| Zástava vozidla | `zastava-vozidla.html` |
| Drahé kovy & cennosti | `zastava-cennosti.html` |
| Rychlé peníze / mikropůjčky | `rychle-penize.html` |
| Výkup drahých kovů | `vykup-kovu.html` |
| Konsolidace `[POTVRDIT S KLIENTEM]` | `konsolidace.html` |
| Financování pro podnikatele `[POTVRDIT S KLIENTEM]` | `financovani-podnikatele.html` |

One-page (`index.html`) sekce: Hero → Služby → Parametry → Kalkulačka → Jak to funguje →
Proč FinTrust → FAQ → Nezávazná poptávka + kontakt → patička.

- Hlavička/patička: `js/components.js` (název sub-brandu **Capital** je na jednom místě — `BRAND.sub` → snadno vyměnitelné).
- Interakce: `js/app.js` (převzato z Reality) + `js/capital.js` (kalkulačka, FAQ, GDPR).
- Design: `css/style.css` (Reality design systém + Capital komponenty).

## Kalkulačka
Čistě **ilustrativní** rozpětí splátky (částka + typ zástavy + splatnost). **Nezobrazuje
úrok ani RPSN.** Výsledek vždy končí sdělením „Přesnou nabídku vám připraví váš poradce" + CTA.

## Placeholdery — nic se nevymýšlelo
Viditelně označené k doplnění:
- `[DOPLNÍ KLIENT — entita se zakládá]` — název s.r.o., IČO, sídlo
- `[DOPLNIT]` — telefon, e-mail
- `[PRÁVNÍ TEXT — DODÁ COMPLIANCE]` — poskytovatel/licence, reprezentativní příklad, RPSN, GDPR
- `[OVĚŘIT]` — parametry převzaté ze stávající nabídky (LTV, výše, splatnost, bez příjmů, lhůty)
- `[POTVRDIT S KLIENTEM]` — konsolidace a financování pro podnikatele
- Konkrétní úrokové sazby nejsou uvedeny nikde.

## Další kroky (po schválení designu)
- Doladit responzivitu (mobil/tablet) a přístupnost — stejný proces jako u Reality.
- Doplnit reálné údaje, právní texty (compliance), potvrdit název (Capital) a sporné sekce.
- Vlastní GitHub repo + Vercel projekt.
